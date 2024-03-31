package com.project.amaris.auth.api;

import com.project.amaris.auth.dto.AuthDto;
import com.project.amaris.auth.service.ControlService;
import com.project.amaris.user.dto.RoleClass;
import com.project.amaris.user.entity.Role;
import com.project.amaris.user.entity.User;
import com.project.amaris.user.repository.UserRepository;
import com.project.amaris.user.service.UserServiceImpl;
import com.project.amaris.webConfig.jwt.JwtResponse;
import com.project.amaris.webConfig.jwt.JwtTokenProvider;
import io.jsonwebtoken.impl.DefaultClaims;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class LoginApi {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;
	@Autowired
		private ControlService controlService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository repository;


	private static Logger log = LoggerFactory.getLogger(LoginApi.class);


	@PostMapping("/api/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthDto authenticationRequest) throws Exception {
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));

			if(!authentication.isAuthenticated()){
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
			}
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtTokenProvider.generateToken(authentication);
			String username = authenticationRequest.getUsername();
			Optional<User> opt = repository.findByUsername(username);

			if(!opt.isPresent()){
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
			}
			User user = opt.get();
//			if(user.getIsLoggedIn() == 1)
//				return ResponseEntity.status(HttpStatus.CONFLICT).body("CONFLICT");
			user.setIsLoggedIn(1);
			user = userRepository.save(user);
			return ResponseEntity.ok(new JwtResponse(user.getUserId(), username,jwt,null,user.getRole()));
		}catch (Exception e) {
			//ApiError error = new ApiError(401, "Unauthorized request : "+e.getMessage(), "/api/login");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
		}
	
	}
	@GetMapping("/api/roles")
	public ResponseEntity<List<RoleClass>> getAllBookStatus() {
		List<Role> roles= Arrays.asList(Role.values());
		ArrayList<RoleClass> roleClasses= new ArrayList<>();
		roles.forEach(role->{
			RoleClass roleClass = new RoleClass(role, role.getValue());
			roleClasses.add(roleClass);
		});
		return ResponseEntity.ok(roleClasses);
	}


	@GetMapping("/refresh-token")
	public ResponseEntity<?> refreshtoken(HttpServletRequest request) throws Exception {
		// From the HttpRequest get the claims
		DefaultClaims claims = (DefaultClaims) request.getAttribute("claims");

		Map<String, Object> expectedMap = getMapFromIoJsonwebtokenClaims(claims);
		String token = jwtTokenProvider.doGenerateRefreshToken(expectedMap, expectedMap.get("sub").toString());
		return ResponseEntity.ok(token);
	}

	public Map<String, Object> getMapFromIoJsonwebtokenClaims(DefaultClaims claims) {
		Map<String, Object> expectedMap = new HashMap<String, Object>();
		for (Map.Entry<String, Object> entry : claims.entrySet()) {
			expectedMap.put(entry.getKey(), entry.getValue());
		}
		return expectedMap;
	}

	private User getUserFromToken(String authHeader) throws Exception {

		String username = controlService.getUsernameFromToken(authHeader);
		Optional<User> optUser = userRepository.findByUsername(username);
		if(!optUser.isPresent()) {
			throw new Exception("Not found User");
		}
		return optUser.get();
	}

}
