package zinxs.wiki.webdirectories.home;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import zinxs.wiki.accountsapi.utilities.AuthTokenUtils;

@AllArgsConstructor
@RestController
@RequestMapping(path = "")
public class HomeDirectoryController {

    @Autowired
    private AuthTokenUtils authTokenUtils;

    @CrossOrigin
    @GetMapping
    public ModelAndView getLoginPage(@CookieValue(value = "token", defaultValue = "none") String token){
        ModelAndView modelAndView = new ModelAndView();
        if(token.equals("none")){
            modelAndView.setViewName("homepage-logged-out.html");
        }else{
            try {
                if (authTokenUtils.isExpired(token)) {
                    modelAndView.setViewName("homepage-logged-out.html");
                } else {
                    modelAndView.setViewName("homepage-logged-in.html");
                }
            }catch (Exception e){
                modelAndView.setViewName("homepage-logged-out.html");
            }
        }

        return modelAndView;
    }
}
