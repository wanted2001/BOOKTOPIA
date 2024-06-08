package com.booktopia.www.controller;

import com.booktopia.www.domain.UserVO;
import com.booktopia.www.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.Banner;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RequiredArgsConstructor
@RequestMapping("/user/*")
@Controller
@Slf4j
public class UserController {

    private final UserService usv;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/login")
    public String login(@RequestParam(name = "error", required = false) String error, Model model) {
        log.info(">>>>>>>>>>>>>>> login error 잡힘!");
        log.info("error {}", error);
        if(error != null){
            model.addAttribute("errorMessage", "아이디와 비밀번호를 확인해주세요.");
            return "/user/login";
        }else{
            return "/user/login";
        }

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

    @GetMapping("/deleteUser")
    public void deleteUser(){}

    @PostMapping("/modify")
    public String modifyUser(UserVO uvo, RedirectAttributes re) {
        log.info("pwd >> {}",uvo.getPwd());
        if (uvo.getPwd() == null || uvo.getPwd().length() <= 0) {
            usv.modifyMyinfo(uvo);
        } else {
            String setPwd = passwordEncoder.encode(uvo.getPwd());
            uvo.setPwd(setPwd);
            usv.modifyMyinfoWithPwd(uvo);
        }
        re.addAttribute("modify","success");
        return "redirect:/user/myPage";
    }


    @GetMapping("/findId")
    public void findId(){}

    @ResponseBody
    @GetMapping("/findId/{userName}")
    public ResponseEntity<String> findId(@PathVariable("userName") String userName) {
        log.info("아이디 찾는 유저의 이름 >>>>> {}", userName);
        return  ResponseEntity.ok(usv.findId(userName));

    }


    @GetMapping("/user/modifyAddr")
    public String modifyaddr(UserVO uvo, RedirectAttributes re){
        usv.updateAddr(uvo);
        re.addAttribute("modifyAddr","success");
        return "redirect:/user/mypage";
    }






}
