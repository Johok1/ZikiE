package zinxs.wiki;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import zinxs.wiki.wikis.files.FileManagerController;
import zinxs.wiki.wikis.files.FileManagerService;

import javax.annotation.Resource;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class AlphaApplication implements CommandLineRunner {

	@Resource
	FileManagerService fileManagerService;

	public static void main(String[] args) {
		SpringApplication.run(AlphaApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
//    storageService.deleteAll();
		fileManagerService.init();
	}

}
