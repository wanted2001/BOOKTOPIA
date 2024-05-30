package com.booktopia.www.controller;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.SubscribeInfoVO;
import com.booktopia.www.service.*;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.Locale;

@Controller
@RequestMapping("/pay/*")
@Slf4j
public class PayController {

    @Autowired
    private SubscribeService ssv;
    @Autowired
    private PayService psv; //implements 없음
    @Autowired
    private OrderInfoService osv;

    @Value("2171128503337876")
    private String api;
    @Value("KiIcCNRzGYoW6U45aU1n9xI8bJ98TlUQP9tF4A1pbe44jcxQt5FxAOispEqpYa17sjNjaRojnO8GM4s6")
    private String secretkey;

    private IamportClient iamportClient = new IamportClient(api,secretkey);

    public PayController(){
        this.iamportClient = new IamportClient("2171128503337876",
                "KiIcCNRzGYoW6U45aU1n9xI8bJ98TlUQP9tF4A1pbe44jcxQt5FxAOispEqpYa17sjNjaRojnO8GM4s6");
    }

    @GetMapping("/done")
    public void dome(){}

//    @PostMapping("/done")
//    public String done(){
//        log.info(">>> 들어옴 >>> ");
//        return "redirect:/pay/done";
//    }

    @GetMapping("/getPay")
    public void getPay(Model m, @RequestParam("month") int month) {
        log.info("month값>>{}", month);
        SubscribeInfoVO ssivo = ssv.getPayInfo(month);
        log.info("ssivo>>{}", ssivo);
        m.addAttribute("ssivo", ssivo);
    }

    @PostMapping("/pay_ing/{imp_uid}")
    @ResponseBody
    public IamportResponse<Payment> paymentByImpUid(Model m, Locale locale, HttpSession session,
                                                    @PathVariable(value = "imp_uid") String imp_uid) throws IamportResponseException, IOException{
        log.info("확인확인");
        log.info("imp_uid들어오는지 확인 >> {}",imp_uid);
        return iamportClient.paymentByImpUid(imp_uid);
    }

    @PostMapping("/done")
    @ResponseBody
    public int paymentComplete(HttpSession session, String imp_uid, String merchant_uid, String totalAmount, @RequestBody OrderInfoDTO orderinfoDTO) throws Exception{
        log.info(">>> 들어옴 >>> ");

        log.info("orderinfoDTO >>>>>>>>>>>>{}", orderinfoDTO);
        String token = psv.getToken();
        log.info("token >>>>>>>>>>>>>>>>{}", token);

        String amount = psv.paymentInfo(orderinfoDTO.getImpUid(), token);
        log.info("amount >>>>>>>>>>>>>>>>>{}",amount);

        int res = 1;

        if (orderinfoDTO.getTotalAmount() != Long.parseLong(amount)) {
            //결제취소
            log.info("orderinfoDTO.getTotalAmount()>>>>>>>>>>>{}",orderinfoDTO.getTotalAmount());
            res=0;
            String reason = "결제금액오류";
            psv.payMentCancel(token, orderinfoDTO.getImpUid(),amount,reason);
            return res;
        }
        osv.insertPayInfo(orderinfoDTO);
        return res;
    }

//    @PostMapping("/done")
//    @ResponseBody
//    public int paymentComplete(HttpSession session, String imp_uid, String merchant_uid, String totalAmount, @RequestBody OrderInfoDTO orderinfoDTO) throws Exception{
//        log.info(">>> 들어옴 >>> ");
//
//        log.info("orderinfoDTO >>>>>>>>>>>>{}", orderinfoDTO);
//        String token = psv.getToken();
//        log.info("token >>>>>>>>>>>>>>>>{}", token);
//
//        String amount = psv.paymentInfo(orderinfoDTO.getImpUid(), token);
//        log.info("amount >>>>>>>>>>>>>>>>>{}",amount);
//
//        int res = 1;
//
//        if (orderinfoDTO.getTotalAmount() != Long.parseLong(amount)) {
//            //결제취소
//            log.info("orderinfoDTO.getTotalAmount()>>>>>>>>>>>{}",orderinfoDTO.getTotalAmount());
//            res=0;
//            String reason = "결제금액오류";
//            psv.payMentCancel(token, orderinfoDTO.getImpUid(),amount,reason);
//            return res;
//        }
//        osv.insertPayInfo(orderinfoDTO);
//        return res;
//    }

//    @ResponseBody
//    @PostMapping("/done/{imp_uid}")
//    public void done(@PathVariable(value = "imp_uid")String imp_uid)throws IOException {
//        log.info("imp_uid 값>>>>>>>>>>>>>>>>>>>>>>>>{}", imp_uid);
//
//    }



































//    @ResponseBody
//    @GetMapping("/kakaoPay")
//    public String kakaoPay() {
//        OrderPayDTO opdto = new OrderPayDTO();
//        OrderInfoDTO oidto = new OrderInfoDTO();
//        oidto.setOrderNo(opdto.getPayList().get(0).getOrderNo());
//        oidto.setId(opdto.getId());
//        oidto.setPayName(opdto.getPayList().get(0).getPayName());
//        oidto.setAmount(opdto.getPayList().get(0).getAmount());
//        oidto.setTotalAmount(opdto.getPayList().get(0).getTotalAmount());
//        log.info("oidto값 >>>>>{}", oidto);
//        try {
//            URL url = new URL("https://://kapi.kakao.com/v1/payment/ready");
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestMethod("POST");
//
//            conn.setRequestProperty("Authorization", "KakaoAK 9b05cd727ba09686a7fddb914b120d51");
//            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
//            conn.setDoOutput(true);
//
//            String parameter = "cid=C32D2035D1F1FC997854" + //가맹점코드
//                    "&partner_order_id=" + oidto.getOrderNo() + //가맹점 주문번호
//                    "&partner_user_id=" + oidto.getId() + //가맹점 회원 id
//                    "&item_name=" + oidto.getPayName() + //상품명
//                    "&quantity=1" + oidto.getAmount() + //수량
//                    "&total_amount=" + oidto.getTotalAmount() + //총 금액
//                    "&tax_free_amount=0" + //비과세
//                    "&approval_url=http://localhost:8099/pay/done" + //결제성공
//                    "&fail_url=http://localhost:8099/subscribe/info" + //결제실패
//                    "&cancel_url=http://localhost:8099/user/login"; //결제취소
//
//            OutputStream outputStream = conn.getOutputStream();
//            DataOutputStream dataOutputStream = new DataOutputStream(outputStream);
//            dataOutputStream.writeBytes(parameter);
//            dataOutputStream.close();
//
//            int result = conn.getResponseCode();
//
//            InputStream inputStream;
//            if (result == 200) {
//                inputStream = conn.getInputStream();
//            } else {
//                inputStream = conn.getErrorStream();
//            }
//
//            InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
//            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
//            return bufferedReader.readLine();
//
//        } catch (MalformedURLException e){
//            throw new RuntimeException(e);
//        }   catch (IOException e){
//            throw new RuntimeException(e);
//        }
//    }
//
//    @PostMapping("/kakaoready")
//    public KakaoReadyResponse kakaoPayReady(){
//        return psvImpl.getKakaoReady();
//    }

}

//    @PostMapping("/payInfo")
//    public String payInfo(OrderInfoVO oivo) {
//        log.info("oivo>>{}", oivo);
//        List<SubscribeInfoVO> sublist = ssv.getPayShipNo();
//        OrderUserDTO oudto = new OrderUserDTO(oivo, sublist);
//        osv.regiOrderUser(oudto);
//        return "redirect:/pay/done";
//    }

//    @PostMapping("/complete")
//    public ResponseEntity<String> completePay(@RequestBody List<OrderInfoDTO> orderInfoDTO) throws IOException {
//        log.info("iamport값 >>{}", iamportClient);
//        String tid = String.valueOf(orderInfoDTO.get(0).getTid());
//        try {
//            String id = orderInfoDTO.get(0).getId();
//            psv.saveOrder(id, orderInfoDTO);
//            log.info("결제성공 : 주문번호 {}", orderInfoDTO);
//            return ResponseEntity.ok().build();
//        } catch (RuntimeException e) {
//            log.info("주문 상품 환불 : 주문번호 {}", tid);
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//}

//    @PostMapping("/order/payment")
//public ResponseEntity<String> paymentComplete @RequestBody List<OrderSaveDto> orderSaveDtos) throws IOException {
//        String orderNumber = String.valueOf(orderSaveDtos.get(0).getOrderNumber());
//        try {
//            Long userId = sessionUser.getUserIdNo();
//            paymentService.saveOrder(userId, orderSaveDtos);
//            log.info("결제 성공 : 주문 번호 {}", orderNumber);
//            return ResponseEntity.ok().build();
//        }
//        catch (RuntimeException e)
//        {
//            log.info("주문 상품 환불 진행 : 주문 번호 {}", orderNumber);
//            String token = refundService.getToken(apiKey, secretKey);
//            refundService.refundWithToken(token, orderNumber, e.getMessage());
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//    @PostMapping("/payment/validation/{imp_uid}")
//    @ResponseBody
//    public IamportResponse<Payment> validateIamport(@PathVariable String imp_uid) {
//        IamportResponse<Payment> payment = iamportClient.paymentByImpUid(imp_uid);
//        log.info("결제 요청 응답. 결제 내역 - 주문 번호: {}", payment.getResponse().getMerchantUid());
//        return payment;
//    }}