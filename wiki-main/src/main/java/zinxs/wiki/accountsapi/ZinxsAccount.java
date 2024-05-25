package zinxs.wiki.accountsapi;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Entity
public interface ZinxsAccount  {

    @SequenceGenerator(
            name = "zinxs_account_sequence",
            sequenceName = "zinxs_account_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "zinxs_account_sequence"
    )


    public String getUsername();

    public String getEmail();


    public Collection<? extends GrantedAuthority> getAuthorities();


    public String getPassword();


    public boolean isAccountNonExpired();


    public boolean isAccountNonLocked();


    public boolean isCredentialsNonExpired();


    public boolean isEnabled();
}
