package com.booktopia.www.controller;

import com.booktopia.www.domain.UserVO;
import com.booktopia.www.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/user/*")
@Controller
@Slf4j
public class UserController {

    private final UserService usv;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/login")
    public void login(){
    }

    @GetMapping("/join")
    public void join(){
    }
    
    @PostMapping("/join")
    public String joinInsert(UserVO uvo){
        uvo.setPwd(passwordEncoder.encode(uvo.getPwd()));
        log.info("uvo >> {}",uvo);
        int isOk = usv.joinInsert(uvo);
        return "/user/login";
    }

    @GetMapping("/myPage")
    public void info(){}

    @PostMapping(value = "/check",consumes="text/plain",produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> idCheck(@RequestBody String id){
        log.info("id> {}" ,id);
        int isOk = usv.checkId(id);
        return isOk == 0? new ResponseEntity<String>("0", HttpStatus.OK) :
                new ResponseEntity<String>("1", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @ResponseBody
    @GetMapping("/isSocialUser/{id}")
    public String isSocialUser(@PathVariable("id")String id){
        String type = usv.isSocialUser(id);
        log.info("type >> {}",type);
        return type;
    }

    @GetMapping("/test")
    public void intodiv(){
    }

}
