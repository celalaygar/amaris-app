package com.project.amaris.webConfig.jwt;

import com.project.amaris.user.entity.Role;
import lombok.*;

import java.io.Serializable;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse  implements Serializable{
	private Long userId;
	private String username;
	private String jwttoken;
	private String email;
	private Role role;
}
