package zinxs.wiki.directories;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ResetPasswordRequest {

    private final String newPassword;
    private final String confirmPassword;
}
