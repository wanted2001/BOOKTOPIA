package com.booktopia.www.controller;

import com.booktopia.www.domain.*;
import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.w3c.dom.Entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequestMapping("/admin/*")
@RequiredArgsConstructor
public class AdminController {

    private final UserMapper userMapper;
    private final BookTopiaMapper bookTopiaMapper;
    private final OrderInfoMapper orderInfoMapper;
    private final PayMapper payMapper;
    private final DeliMapeer deliMapeer;
    private final BoardMapper boardMapper;
    private final CommentMapper commentMapper;


    @GetMapping("/adminPage")
    public String adminPage(Model model) {
        // 회원가입 user > DB 에서 가져오기
        List<UserVO> ulist = userMapper.getList();

        // Booktopia test 진행한 user > DB에서 가져오기
        List<BooktopiaVO> btlist = bookTopiaMapper.bTestList();

        // 구독자 리스트 pay, order_info >> DB에서 가져와 OrderInfoDTO에 담기
        List<OrderInfoVO> ordlist = orderInfoMapper.orderList();
        List<PayVO> paylist = payMapper.payList();
        List<OrderInfoDTO> odtolist = new ArrayList<>();

        for(int i=0;i<ordlist.size();i++){
            OrderInfoVO orderInfo = ordlist.get(i);
            PayVO payInfo = paylist.get(i);

            OrderInfoDTO dto = new OrderInfoDTO();
            dto.setMerchantUid(orderInfo.getMerchantUid());
            dto.setOrdName(orderInfo.getOrdName());
            dto.setOrdPhone(orderInfo.getOrdPhone());
            dto.setOrdAddr(orderInfo.getOrdAddr());
            dto.setItemName(payInfo.getItemName());
            dto.setTotalAmount(payInfo.getTotalAmount());

            odtolist.add(dto);
        }

        // 배송 현황 리스트 가져오기
        List<DeliveryVO> delilist = deliMapeer.getList();
        log.info(">>> delilist >>> {}", delilist);

        // board 리스트 DB에서 가져오기
        List<BoardVO> boadlist = boardMapper.getboarList();

        // comment 리스트 DB에서 가져오기
        List<CommentVO> commlist = commentMapper.getComList();
        log.info(">>> commlist >>> {}", commlist);


        model.addAttribute("ulist", ulist);
        model.addAttribute("testlist", btlist);
        model.addAttribute("odtolist", odtolist);
        model.addAttribute("delilist", delilist);
        model.addAttribute("boadlist", boadlist);

        return "/admin/adminPage";
    }


}
