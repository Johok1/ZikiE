package zinxs.wiki.directories;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@AllArgsConstructor
@RestController
@RequestMapping(path = "login")
public class LoginDirectoryController {

    @CrossOrigin
    @GetMapping
    public ModelAndView getLoginPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login/index.html");
        return modelAndView;
    }
}
