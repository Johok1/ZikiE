package zinxs.wiki.directories;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import zinxs.wiki.account.Account;
import zinxs.wiki.account.AccountRepository;
import zinxs.wiki.security.PasswordEncoder;
import zinxs.wiki.utilities.AuthTokenUtils;
import zinxs.wiki.validation.ValidationService;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@AllArgsConstructor
@RestController
@RequestMapping(path = "resetpassword")
public class ResetPasswordController {

    private final AuthTokenUtils authTokenUtils;
    private final ValidationService validationService;

    private AccountRepository accountRepository;
    private  final PasswordEncoder passwordEncoder;

    @CrossOrigin
    @GetMapping
    public ModelAndView resetPassword(){

                ModelAndView modelAndView = new ModelAndView();
                modelAndView.setViewName("resetpassword/index.html");
                return modelAndView;
    }

    //this sets the page at the "subdomain"/folder (localhost/resetpassword)
    @CrossOrigin
    @GetMapping("/request/{emailToken}")
    public String resetPasswordPage(HttpServletResponse response, @PathVariable String emailToken) throws IOException {
        try{

                String email = authTokenUtils.decodeEmail(emailToken);
                Account account = accountRepository.findByEmail(email).get();
                if (!(account.isEnabled())) {
                    throw new Exception("account is disabled!");
                }
                Cookie tempTokenCookie = new Cookie("emailToken", emailToken);
                tempTokenCookie.setPath("/resetpassword");
                response.addCookie(tempTokenCookie);
                response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
                response.setHeader("Location", "http://localhost/resetpassword");
                response.flushBuffer();
                return "true";

        }catch (Exception e){
            response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
            response.setHeader("Location", "http://localhost/");
            response.flushBuffer();
            return "false";
        }
    }

    @CrossOrigin
    @PostMapping("/resetPassword/{token}")
    public String resetPassword(@PathVariable String token, @RequestBody ResetPasswordRequest request){
        try{
            Account account = getAccount(token);
            String encodedPasswordNew = authTokenUtils.bCryptPasswordEncoder
                    .encode(request.getNewPassword());
            if(request.getNewPassword().equals(request.getConfirmPassword())){
                if(!(authTokenUtils.bCryptPasswordEncoder.matches(request.getNewPassword(),
                        account.getPassword()))){
                    account.setPassword(encodedPasswordNew);
                    accountRepository.save(account);
                    return "true";
                }else{
                    return "Account password matches new password";
                }
            }else {
                return "Confirm password invalid";
            }

        }catch (Exception e){
            return "An internal error has occurred";
        }
    }

    private Account getAccount(String tempToken){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            if(targetAccount.isEnabled()){
                return targetAccount;
            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("getAccount error " + e);
        }
    }


}
