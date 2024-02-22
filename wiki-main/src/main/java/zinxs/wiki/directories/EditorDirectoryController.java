package zinxs.wiki.directories;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@AllArgsConstructor
@RestController
@RequestMapping(path = "editor")
public class EditorDirectoryController {

    @CrossOrigin
    @GetMapping
    public ModelAndView getDirectoryPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("wiki-page-editor.html");
        return modelAndView;
    }
}
