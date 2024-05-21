package zinxs.wiki.webdirectories.home;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@AllArgsConstructor
@RestController
@RequestMapping(path = "")
public class HomeDirectoryController {
    @CrossOrigin
    @GetMapping
    public ModelAndView getLoginPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("home/homepage-logged-out.html");
        return modelAndView;
    }
}
