package zinxs.wiki.account;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class Account implements UserDetails {

    @SequenceGenerator(
            name = "account_sequence",
            sequenceName = "account_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "account_sequence"
    )
    private Long id;

    private String username, password, email, confirmPassword, dob, pincode, nickname, bio;
    private byte[] profileImage, bannerImage;
    private boolean locked = false, enabled = false;
    @Enumerated(EnumType.STRING)
    private AccountRole accountRole;


    public Account(String username,
                   String email,
                   String password,
                   String confirmPassword,
                   String pincode,
                   String dob,
                   AccountRole accountRole) {
        this.username = username;
        this.confirmPassword = confirmPassword;
        this.dob = dob;
        this.pincode = pincode;
        this.email = email;
        this.password = password;
        this.accountRole = accountRole;
    }

    public String getUsername(){
        return  this.username;
    }

    public String getEmail() {
        return this.email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(accountRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


}
