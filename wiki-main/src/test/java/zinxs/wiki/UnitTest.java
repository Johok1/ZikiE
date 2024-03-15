package zinxs.wiki;


import static org.assertj.core.api.BDDAssumptions.given;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import org.aspectj.lang.annotation.Before;

import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import zinxs.wiki.account.wix.*;
import zinxs.wiki.wikis.pages.PageRepository;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
import org.junit.Test;

import java.util.List;


@RunWith(SpringRunner.class)
@DataJpaTest(showSql = false)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UnitTest {


    @Autowired
    public WixAccountRepository wixAccountRepository;

    @Autowired
    public PageRepository pageRepository;

    @InjectMocks
    private WixAccountService service;

    private String memberId, pincode, invalidPincode, invalidMemberId;
    private void initRepositoryServiceConditions(){
        service.setPageRepository(pageRepository);
        service.setWixAccountRepository(wixAccountRepository);
        memberId = "1";
        pincode = "BUST";
        invalidPincode = "INVALID";
        invalidMemberId = "INVALID";
    }

    @Test
    public void testNewWixAccountWithInvalidMemberId() {
        this.initRepositoryServiceConditions();
        Throwable thrown = catchThrowable(() -> service.newWixAccount(invalidMemberId));
        assertThat(thrown).isNull();
    }

    @Test
    public void testCreateValidWixAccount() throws Exception {

        this.initRepositoryServiceConditions();
        assertThat(service.newWixAccount("1")).isEqualTo("true");
    }

    private void initRepositoryServiceConditions_AfterAccount(){
        this.initRepositoryServiceConditions();
        service.newWixAccount(memberId);
    }

    @Test
    public void testGetWixAccountsWithValidPincode() {

        this.initRepositoryServiceConditions_AfterAccount();
        // Assuming method getWixAccounts should return a list when valid
        assertThat(service.getWixAccounts(pincode)).isNotEmpty();
    }

    @Test
    public void testGetWixAccountsWithInvalidPincode() {
        this.initRepositoryServiceConditions_AfterAccount();
        Throwable thrown = catchThrowable(() -> service.getWixAccounts(invalidPincode));
        assertThat(thrown).isInstanceOf(Exception.class);
    }


    private String pageId;
    private String invalidPageId;
    private String pageName;
    private String pageImgUrl;

    private void initRepositoryServiceConditions_ForPages(){
        // Initial setup from previous tests
        this.initRepositoryServiceConditions_AfterAccount();
        pageName = "Sample Page";
        pageImgUrl = "http://example.com/sample.jpg";
        invalidPageId = "INVALID";


        pageId = service.newAccountPage(memberId, pageName); // Create a new page for testing
    }

    @Test
    public void testCreateValidPage() {
        this.initRepositoryServiceConditions_ForPages();
        assertThat(pageId).isNotNull();
    }

    @Test
    public void testSetAndGetPageName() {
        this.initRepositoryServiceConditions_ForPages();
        String newName = "Updated Page Name";
        service.setPageName(memberId, pageId, newName);
        assertThat(service.getPageName(pageId)).isEqualTo(newName);
    }

    @Test
    public void testSetAndGetPageImage() {
        this.initRepositoryServiceConditions_ForPages();

        service.setPageImg(memberId, pageId, new ImageUrlRequest(pageImgUrl,""));
        assertThat(service.getPageImg(pageId)).isEqualTo(pageImgUrl);
    }

    private void initRepositoryServiceConditions_PageHasImage(){
        this.initRepositoryServiceConditions_ForPages();
        service.setPageImg(memberId, pageId, new ImageUrlRequest(pageImgUrl,""));
    }

    @Test
    public void testGetAccountPageHeadersWithValidWixId() {
        this.initRepositoryServiceConditions_PageHasImage();
        List<AccountPageHeaderResponse> headers = service.getAccountPageHeaders(memberId);
        assertThat(headers).isNotEmpty();
        assertThat(headers.get(0).getPageName()).isEqualTo(pageName);
        assertThat(headers.get(0).getUrl()).isEqualTo(pageImgUrl);
    }

    @Test
    public void testSetPageNameWithInvalidCredentials() {
        this.initRepositoryServiceConditions_ForPages();
        Throwable thrown = catchThrowable(() -> service.setPageName(invalidMemberId, pageId, "New Invalid Name"));
        assertThat(thrown).isInstanceOf(RuntimeException.class);
    }

    @Test
    public void testSetPageImageWithInvalidCredentials() {
        this.initRepositoryServiceConditions_ForPages();
        Throwable thrown = catchThrowable(() -> service.setPageImg(invalidMemberId, pageId, new ImageUrlRequest("http://example.com/invalid.jpg","")));
        assertThat(thrown).isInstanceOf(RuntimeException.class);
    }

    @Test
    public void testGetPageHeaderWithInvalidWixId() {
        this.initRepositoryServiceConditions_PageHasImage();
        Throwable thrown = catchThrowable(() -> service.getAccountPageHeaders(invalidMemberId));
        assertThat(thrown).isInstanceOf(RuntimeException.class);
    }


    private String pageContent;
    private String newPageContent;

    private void initRepositoryServiceConditions_ForPageContent(){
        // Initial setup from previous tests, ensure a page is available for content updates
        this.initRepositoryServiceConditions_PageHasImage();
        pageContent = "Initial page content";
        newPageContent = "Updated page content";
        service.postAccountPageContent(memberId, pageId, pageContent); // Set initial content for the page
    }

    @Test
    public void testSetAndGetPageContent() {
        this.initRepositoryServiceConditions_ForPageContent();
        // Update the page content
        service.postAccountPageContent(memberId, pageId, newPageContent);
        // Retrieve the updated content
        String retrievedContent = service.getPageContent(memberId, pageId);
        assertThat(retrievedContent).isEqualTo(newPageContent);
    }

    @Test
    public void testGetPageContentWithInvalidCredentials() {
        this.initRepositoryServiceConditions_ForPageContent();
        // Attempt to retrieve content with invalid member ID
        Throwable thrown = catchThrowable(() -> service.getPageContent(invalidMemberId, pageId));
        assertThat(thrown).isInstanceOf(RuntimeException.class);
    }

    @Test
    public void testSetPageContentWithInvalidCredentials() {
        this.initRepositoryServiceConditions_ForPageContent();
        // Attempt to set content with invalid member ID
        Throwable thrown = catchThrowable(() -> service.postAccountPageContent(invalidMemberId, pageId, "Invalid attempt"));
        assertThat(thrown).isInstanceOf(RuntimeException.class);
    }

    @Test
    public void testSetAndGetPageContentWithInvalidPageId() {
        this.initRepositoryServiceConditions_ForPageContent();
        // Attempt to set content with an invalid page ID
        Throwable thrownSet = catchThrowable(() -> service.postAccountPageContent(memberId, invalidPageId, newPageContent));
        assertThat(thrownSet).isInstanceOf(RuntimeException.class);

        // Attempt to get content with an invalid page ID
        Throwable thrownGet = catchThrowable(() -> service.getPageContent(memberId, invalidPageId));
        assertThat(thrownGet).isInstanceOf(RuntimeException.class);
    }

}


