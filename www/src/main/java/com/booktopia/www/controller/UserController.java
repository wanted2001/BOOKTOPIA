package com.booktopia.www.controller;

import com.booktopia.www.domain.DTO.MailDTO;
import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.UserVO;
import com.booktopia.www.service.SendEmailService;
import com.booktopia.www.service.UserService;
import kotlin.collections.IntIterator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/user/*")
@Controller
@Slf4j
public class UserController {

    private final UserService usv;
    private final PasswordEncoder passwordEncoder;
    private final SendEmailService sendEmailService;

    @GetMapping("/login")
    public String login(@RequestParam(name = "error", required = false) String error, Model model) {
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
    public String joinInsert(UserVO uvo, Model m){
        uvo.setPwd(passwordEncoder.encode(uvo.getPwd()));
        log.info("uvo >> {}",uvo);
        int isOk = usv.joinInsert(uvo);
        m.addAttribute("msg", "가입이 완료되었습니다. 로그인해주세요.");
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
        return "redirect:/user/logout";
    }


    @GetMapping("/findId")
    public void findId(){}

    @ResponseBody
    @GetMapping("/findId/{userName}")
    public ResponseEntity<String> findId(@PathVariable("userName") String userName) {
        log.info("아이디 찾는 유저의 이름 >>>>> {}", userName);
        return  ResponseEntity.ok(usv.findId(userName));

    }

    @GetMapping("/findPw")
    public void findPw(){}

    @RequestMapping(value="/findPw", method=RequestMethod.POST)
    public String findPw(UserVO uvo,Model m) throws Exception{
        log.info("user pw >>"+uvo.getId());
        if(usv.findPwCheck(uvo)==0) {
            log.info("memberPWCheck");
            m.addAttribute("msg", "아이디를 확인해주세요.");

            return "/user/findPw";
        }else {
              MailDTO dto = sendEmailService.createMailAndChangePassword(uvo.getEmail(), uvo.getId());
                sendEmailService.mailSend(dto);

            return"/user/findPwDone";
        }
    }

    @GetMapping("/deleteMyPageUser/{id}")
    public ResponseEntity<String> deleteMyPageUser(@PathVariable("id")String id){
        log.info("id >> {}",id);
       int isOk =  usv.deleteMyPageUser(id);
       return isOk == 0? new ResponseEntity<String>("0", HttpStatus.OK) :
               new ResponseEntity<String>("1", HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ResponseBody
    @GetMapping("/myPagePayInfo/{id}")
    public List<OrderInfoDTO> myPagePayInfo(@PathVariable("id") String id, Model m) {
        log.info("id >> {}", id);
        List<OrderInfoDTO> plist = usv.getPlist(id);
        log.info("plist >> {}", plist);
        m.addAttribute("plist", plist);
        return plist;
    }

    @ResponseBody
    @GetMapping("/usingsub/{id}")
    public OrderInfoDTO usingsub(@PathVariable("id")String id, Model m){
        OrderInfoDTO sublist = usv.getsublist(id);
        m.addAttribute("sublist",sublist);
        return sublist;
    }

    @ResponseBody
    @PostMapping("/moddata")
    public int modifyaddr(@RequestBody UserVO uvo){
        log.info("uvo >> {}",uvo);
        int isOk = usv.modifyaddrandphone(uvo);
        return isOk;
    }
}
    



