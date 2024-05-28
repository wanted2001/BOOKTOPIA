package com.booktopia.www.controller;

import com.booktopia.www.domain.UserVO;
import com.booktopia.www.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;

@RequiredArgsConstructor
@RequestMapping("/user/*")
@Controller
@Slf4j
public class UserController {

    private final UserService usv;

    @GetMapping("/login")
    public void login(){
    }

    @PostMapping("/login")
    public String login(UserVO uvo, Model m){
        log.info("uvo >> {}",uvo);
        return "/index";
    }

    @GetMapping("/join")
    public void join(){
    }
    
    @PostMapping("/join")
    public String joinInsert(UserVO uvo){
        log.info("uvo >> {}",uvo);
        int isOk = usv.joinInsert(uvo);
        return "/user/login";
    }

    @GetMapping("/myPage")
    public void info(){}

    @GetMapping("/check/{inputIdVal}")
    @ResponseBody
    public int checkId(@PathVariable("inputIdVal")String id){
        log.info("id >> {}", id);
        int isOk = usv.checkId(id);
        return isOk;
    }
}
