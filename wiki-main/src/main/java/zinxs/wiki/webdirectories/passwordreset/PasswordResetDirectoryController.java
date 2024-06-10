package zinxs.wiki.webdirectories.passwordreset;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import zinxs.wiki.accountsapi.Account;
import zinxs.wiki.accountsapi.AccountRepository;
import zinxs.wiki.accountsapi.utilities.AuthTokenUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@AllArgsConstructor
@RestController
@RequestMapping(path = "passwordreset")
public class PasswordResetDirectoryController {

    @Autowired
    private AuthTokenUtils authTokenUtils;

    @Autowired
    private AccountRepository accountRepository;

    @CrossOrigin
    @GetMapping(path="request")
    public ModelAndView resetPasswordWithToken(@RequestParam("token") String token, HttpServletResponse response){
        ModelAndView modelAndView = new ModelAndView();
        try {
            Account account = accountRepository.findByEmail(authTokenUtils.decodeEmail(token)).get();
            if (account.isEnabled()) {
                response.addCookie(new Cookie("token", token));
                modelAndView.setViewName("auth-reset-password.html");
            }else{
                modelAndView.setViewName("redirect:/login");
            }
            return modelAndView;
        }catch (Exception e){
            modelAndView.setViewName("redirect:/");
            e.printStackTrace();
            return modelAndView;
        }
    }

    @CrossOrigin
    @GetMapping
    public ModelAndView getPasswordResetPage(@CookieValue(value = "token", defaultValue = "none") String token){
        ModelAndView modelAndView = new ModelAndView();
        if(token.equals("none")){
            // System.out.println("Token was None");
            modelAndView.setViewName("auth-password-social.html");
        }else{
            try {
                if (authTokenUtils.isExpired(token)) {
                    //   System.out.println("token was expired");
                    modelAndView.setViewName("auth-password-social.html");
                } else {
                    //  System.out.println("token was valid");
                    modelAndView.setViewName("auth-password-social.html");
                }
            }catch (Exception e){
                //  System.out.println("token process gave error :" + e);
                modelAndView.setViewName("auth-password-social.html");
            }
        }

        return modelAndView;
    }
}
