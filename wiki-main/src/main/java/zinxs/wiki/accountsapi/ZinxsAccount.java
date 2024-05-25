package zinxs.wiki.accountsapi;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import java.util.Collection;
import java.util.Collections;

@Entity
public interface ZinxsAccount  {

    public String getUsername();

    public String getEmail();


    public Collection<? extends GrantedAuthority> getAuthorities();


    public String getPassword();


    public boolean isAccountNonExpired();


    public boolean isAccountNonLocked();


    public boolean isCredentialsNonExpired();


    public boolean isEnabled();
}
