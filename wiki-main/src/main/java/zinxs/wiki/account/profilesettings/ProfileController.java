package zinxs.wiki.account.profilesettings;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

@RestController
@RequestMapping(path = "api/v1/profile")
@AllArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @CrossOrigin
    @PostMapping("/setProfileImage/{token}")
    public String setProfileImage(@PathVariable String token,@RequestParam("file")MultipartFile image){
        System.out.println("ProfileController setProfileImage posted " + image.getOriginalFilename());
        return profileService.setProfileImage(token, image);
    }

    @CrossOrigin
    @GetMapping(value = "/getProfileImage/{token}",
                produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getProfileImage(@PathVariable String token){
        return profileService.getProfileImage(token);
    }

    @CrossOrigin
    @PostMapping("/setBannerImage/{token}")
    public String setBannerImage(@PathVariable String token,@RequestParam("file")MultipartFile image){
        System.out.println("ProfileController setProfileImage posted " + image.getOriginalFilename());
        return profileService.setBannerImage(token, image);
    }

    @CrossOrigin
    @GetMapping(value = "/getBannerImage/{token}",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getBannerImage(@PathVariable String token){
        return profileService.getBannerImage(token);
    }

    @CrossOrigin
    @GetMapping("/getUsername/{token}")
    public String getUsername(@PathVariable String token) {
        return profileService.getProfileUsername(token);
    }

    @CrossOrigin
    @GetMapping("/setUsername/{token}/{username}")
    public String setUsername(@PathVariable String token, @PathVariable String username){
        return profileService.setProfileUsername(token,username);
    }

    @CrossOrigin
    @GetMapping("/getNickname/{token}")
    public String getNickname(@PathVariable String token){
        return profileService.getProfileNickname(token);
    }

    @CrossOrigin
    @GetMapping("/setNickname/{token}/{nickname}")
    public String setNickname(@PathVariable String token, @PathVariable String nickname){
        return profileService.setProfileNickname(token, nickname);
    }

    @CrossOrigin
    @GetMapping("/getBio/{token}")
    public String getBio(@PathVariable String token){
        return profileService.getProfileBio(token);
    }

    @CrossOrigin
    @GetMapping("/setBio/{token}/{bio}")
    public String setBio(@PathVariable String token, @PathVariable String bio){
        return profileService.setProfileBio(token, bio);
    }

    @CrossOrigin
    @GetMapping("/checkPin/{token}/{pin}")
    public String checkPin(@PathVariable String token, @PathVariable String pin){
        return profileService.checkProfilePin(token, pin);
    }

    @CrossOrigin
    @GetMapping("/setEmail/{token}/{email}")
    public String setEmail(@PathVariable String token, @PathVariable String email){
        return profileService.setProfileEmail(token, email);
    }

    @CrossOrigin
    @GetMapping("/getEmail/{token}")
    public String getEmail(@PathVariable String token){
        return profileService.getProfileEmail(token);
    }

    @CrossOrigin
    @GetMapping("/setPassword/{token}/{password}")
    public String setPassword(@PathVariable String token, @PathVariable String password){
        return profileService.setProfilePassword(token,password);
    }

}
