package zinxs.wiki.pages;

public interface PageServiceInterface {


    String newAccountPage(String wixId, String pageName);
    String getPageName(String pageId);
    String setPageName(String memberId, String pageId, String pageName);
    String postAccountPageContent(String wixId, String pageId, String content);
    String getPageContent(String wixId, String pageId);

}
