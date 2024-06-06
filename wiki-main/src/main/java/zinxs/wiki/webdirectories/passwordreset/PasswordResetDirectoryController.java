package zinxs.wiki.webdirectories.passwordreset;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
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
    @GetMapping("/request/{token}")
    public ModelAndView resetPasswordWithToken(@PathVariable String token, HttpServletResponse response){
        ModelAndView modelAndView = new ModelAndView();
        try {
            if (accountRepository.findByEmail(authTokenUtils.decodeEmail(token)).get().isEnabled()) {
                response.addCookie(new Cookie("token", token));
                modelAndView.setViewName("auth-reset-password.html");
                return modelAndView;
            }else{
                modelAndView.setViewName("redirect:/https://www.zinxswiki.com/login");
                return modelAndView;
            }
        }catch (Exception e){
            modelAndView.setViewName("redirect:/https://www.zinxswiki.com");
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
                    modelAndView.setViewName("redirect:/https://www.zinxswiki.com");
                }
            }catch (Exception e){
                //  System.out.println("token process gave error :" + e);
                modelAndView.setViewName("auth-password-social.html");
            }
        }

        return modelAndView;
    }
}
