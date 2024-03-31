package com.project.amaris.user.api;


import com.project.amaris.user.dto.UserPasswordUpdateDto;
import com.project.amaris.user.dto.UserSearchDto;
import com.project.amaris.user.entity.User;
import com.project.amaris.user.service.UserServiceImpl;
import com.project.amaris.util.ApiPath;
import com.project.amaris.user.dto.UserDto;
import com.project.amaris.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping(ApiPath.AdminUserCtrl.CTRL)
public class UserApi {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceImpl userServiceImpl;



    // id bazlı üye gösterme linki
    @GetMapping("/find-by-id/{userid}")
    public ResponseEntity<UserDto> findById(@PathVariable long userid) throws Exception {

        return ResponseEntity.ok(userServiceImpl.findById(userid));
    }

    // üye kayıt güncelleme linki
    @PutMapping("/{userid}")
    public ResponseEntity<Boolean> update(@PathVariable long userid,@Valid @RequestBody UserDto dto) throws Exception {

        return ResponseEntity.ok(userServiceImpl.update(userid, dto));
    }

    // üyeleri liste halinde getirme linki (sayfalama değil)
    @GetMapping("/get-all-users")
    public ResponseEntity<?> findAllUsers(@RequestHeader("Authorization") String authHeader) throws Exception {
        return ResponseEntity.ok(userServiceImpl.findAllUsers(authHeader));
    }

    // üye şifre değiştirme linki
    @PutMapping("/change-password/{userid}")
    public ResponseEntity<Boolean> changePassword(@PathVariable long userid,@Valid @RequestBody UserPasswordUpdateDto dto) throws Exception {

        return ResponseEntity.ok(userServiceImpl.changePassword(userid, dto));
    }

    // üyeler ile ilgili sayfalama yapılma linki (Personel işlemleri)
    @GetMapping("/search")
    public ResponseEntity<Page<UserDto>> search(
            @PageableDefault(size =25, sort = "username", direction = Sort.Direction.ASC ) Pageable page,
            @RequestHeader("Authorization") String authHeader) throws Exception {
        Page<UserDto> list =  userServiceImpl.search(page,authHeader);
        return new ResponseEntity<Page<UserDto>>(list, new HttpHeaders(), HttpStatus.OK);

    }
    // üyeler ile ilgili sayfalama yapılma linki (Personel işlemleri)
    @PostMapping("/page")
    public ResponseEntity<Page<UserDto>> getAllWithPageable(
            @PageableDefault(size =25, sort = "userId", direction = Sort.Direction.ASC ) Pageable page,
            @RequestHeader("Authorization") String authHeader, @RequestBody UserSearchDto dto) throws Exception {
        //Page<UserDto>
        return ResponseEntity.ok(userServiceImpl.getAllWithPageable(page,authHeader, dto));

    }



    // üye giriş yapıp yapmadığının kontrolü için  IsLoggedIn statüsünü 0 a çeker
    @GetMapping("/make-logout/{username}")
    public ResponseEntity<Boolean> defaultLogOut( @RequestHeader("Authorization") String authHeader,
                                                  @PathVariable String username) throws Exception {
        Optional<User> opt = userRepository.findByUsername(username);
        User user = opt.get();
        user.setIsLoggedIn(0);
        user = userRepository.save(user);
        return ResponseEntity.ok(true);
    }

}
