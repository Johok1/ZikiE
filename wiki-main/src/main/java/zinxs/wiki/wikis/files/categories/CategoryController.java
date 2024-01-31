package zinxs.wiki.wikis.files.categories;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/category")
@AllArgsConstructor
public class CategoryController {

    public final CategoryService categoryService;

    @CrossOrigin
    @GetMapping("/getCategoryPages/{categoryId}")
    public String getCategoryPages(@PathVariable String categoryId){
        return categoryService.getCategoryPages(categoryId);
    }

    @CrossOrigin
    @GetMapping("/getCategoryName/{categoryId}")
    public String getCategoryName(@PathVariable String categoryId){
        return categoryService.getCategoryName(categoryId);
    }

}
