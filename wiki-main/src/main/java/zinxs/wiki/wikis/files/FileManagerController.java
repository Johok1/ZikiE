package zinxs.wiki.wikis.files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import zinxs.wiki.wikis.files.dao.FileContextResponse;

@CrossOrigin("https://www.zinxswiki")
@RestController
@RequestMapping(path = "api/v1/file")
public class FileManagerController {
    @Autowired
    FileManagerService fileManagerService;

    @PostMapping("/uploadImage/{token}/{pageId}/{wikiId}")
    public String uploadImage(@PathVariable String token, @PathVariable String pageId,
                              @PathVariable String wikiId,
                              @RequestParam("file") MultipartFile file) {
        return  fileManagerService.saveImage(token, pageId, wikiId, file);
    }

    @PostMapping("/uploadVideo/{token}/{pageId}/{wikiId}")
    public String uploadVideo(@PathVariable String token, @PathVariable String pageId,
                              @PathVariable String wikiId,
                              @RequestParam("file") MultipartFile file) {
        return  fileManagerService.saveVideo(token, pageId, wikiId, file);
    }

    @GetMapping("/getImage/{fileContextId}")
    public Resource getImage(@PathVariable String fileContextId) {
        Resource file = fileManagerService.getImage(fileContextId);
        return file;
    }

    @GetMapping("/getVideo/{fileContextId}")
    public Resource getVideo(@PathVariable String fileContextId) {
        Resource file = fileManagerService.getVideo(fileContextId);
        return file;
    }

    @CrossOrigin
    @GetMapping("getFileContext/{fileContextId}")
    public FileContextResponse fileContextResponse(@PathVariable String fileContextId){
        return fileManagerService.getFileContext(fileContextId);
    }

    @CrossOrigin
    @PostMapping("deleteFile/{wikiId}/{fileContextId}")
    public String deleteFile(@PathVariable String wikiId, @PathVariable String fileContextId){
        return fileManagerService.deleteFile(wikiId, fileContextId);
    }

}
