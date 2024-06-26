package com.project.amaris.auth.api;
import com.project.amaris.user.entity.User;
import com.project.amaris.user.repository.UserRepository;
import com.project.amaris.auth.service.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/logout")
public class LogoutApi {

    @Autowired
    private ControlService controlService;
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/user")
    public ResponseEntity<Boolean> logOut( @RequestHeader("Authorization") String authHeader ) throws Exception {
        User user = this.getUserFromToken(authHeader);
        user.setIsLoggedIn(0);
        user = userRepository.save(user);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/default/{username}")
    public ResponseEntity<Boolean> defaultLogOut( @RequestHeader("Authorization") String authHeader,
                                                  @PathVariable String username) throws Exception {
        Optional<User> opt = userRepository.findByUsername(username);
        User user = opt.get();
        user.setIsLoggedIn(0);
        user = userRepository.save(user);
        return ResponseEntity.ok(true);
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
