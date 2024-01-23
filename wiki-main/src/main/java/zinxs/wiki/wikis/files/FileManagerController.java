package zinxs.wiki.wikis.files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

@RestController
@RequestMapping(path = "api/v1/file")
public class FileManagerController {
    @Autowired
    FileManagerService fileManagerService;

    @PostMapping("/uploadImage")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        return  fileManagerService.saveImage(file);
    }

    @PostMapping("/uploadVideo")
    public String uploadVideo(@RequestParam("file") MultipartFile file) {
        return  fileManagerService.saveVideo(file);
    }

    @GetMapping("/getImage/{filename:.+}")
    @ResponseBody
    public Resource getImage(@PathVariable String filename) {
        Resource file = fileManagerService.getImage(filename);
        return file;
    }

    @GetMapping("/getVideo/{filename:.+}")
    @ResponseBody
    public Resource getVideo(@PathVariable String filename) {
        Resource file = fileManagerService.getVideo(filename);
        return file;
    }


}
