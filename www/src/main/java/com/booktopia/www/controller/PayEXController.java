//package com.booktopia.www.controller;
//
//public class PayEXController {
//
//import ezen.bizqr.pay.domain.StorePaymentVO;
//import ezen.bizqr.pay.service.PayService;
//import ezen.bizqr.store.domain.RegisterVO;
//import ezen.bizqr.store.domain.StoreVO;
//import ezen.bizqr.store.service.StoreService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.*;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//    @Slf4j
//    @Controller
//    @RequiredArgsConstructor
//    @RequestMapping("/payment/*")
//    public class PayController {
//
//        private final PayService psv;
//        private final StoreService ssv;
//
//        @GetMapping("/pay")
//        public String pay(){
//
//
//            return "/payment/pay";
//        }
//
//        @PostMapping("/pay")
//        public String pay(RegisterVO rvo, Model m){
//            log.info("registerVO rvo >>>>> {}", rvo);
//
//            m.addAttribute("rvo", rvo);
//
//            return "/payment/pay";
//        }
//
//        @GetMapping("/list")
//        public String list(Model m){
//
//            List<RegisterVO> list = ssv.getRegisterList();
//
//            log.info("asd list" + list);
//
//            m.addAttribute("list", list);
//
//            return "/payment/list";
//        }
//
//        @PostMapping("/storePay/success")
//        @ResponseBody
//        public String paySuccess(@RequestBody StorePaymentVO spvo){
//            log.info("StorePaymentVO >>>>>>>>>> spvo >>> {}", spvo);
//
//            int isOk = psv.savePayment(spvo);
//
//            return isOk > 0 ? "1" : "0";
//        }
////    @PostMapping("/takeUserInfo/{registerNum}")
////    public ResponseEntity<Object> takeUserInfo(@PathVariable("registerNum") long registerNum){
////
////        RegisterVO rvo = ssv.getDetail(registerNum);
////        String merchantUid = rvo.getMerchantUid();
////        log.info(">>> merchantUid of rvo >>> " + merchantUid);
////
////        StorePaymentVO spvo = psv.getImpUidWithMerchantUid(merchantUid);
////        String impUid = spvo.getImpUid();
////        log.info(">>> impUid of spvo >>> " + impUid);
////
////        Map<String, String> responseData = new HashMap<>();
////        responseData.put("merchantUid", merchantUid);
////        responseData.put("impUid", impUid);
////
////        return new ResponseEntity<>(responseData, HttpStatus.OK);
////    }
//
//        @PostMapping("/alterRegisterInfo/{registerNum}/{isRegistered}")
//        public ResponseEntity<String> alterRegisterInfo(@PathVariable("registerNum") long registerNum, @PathVariable("isRegistered") int isRegistered){
//            log.info(">>> registerNum >>> " + registerNum);
//            log.info(">>> isRegistered >>> " + isRegistered);
//
//            int isOk = ssv.alterRegisterInfo(registerNum, isRegistered);
//
//
//            if(isRegistered == 1){
//                RegisterVO registeredRvo = ssv.getDetail(registerNum);
//                StoreVO svo = new StoreVO();
//
//                svo.setEmail(registeredRvo.getEmail());
//                svo.setRegisterNum(registeredRvo.getRegisterNum());
//                svo.setStoreName(registeredRvo.getStoreName());
//                svo.setStoreAddress(registeredRvo.getStoreAddress());
//                svo.setStoreNumber(registeredRvo.getStoreNum());
//                svo.setStoreType(registeredRvo.getStoreType());
//                svo.setCompany(registeredRvo.getCompany());
//
//                log.info(">>>>>> svo >>>>  {}", svo);
//                ssv.insertStore(svo);
//            }
//            return isOk > 0 ?
//                    new ResponseEntity<String>("0", HttpStatus.OK) :
//                    new ResponseEntity<String>("1", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//        @PostMapping("/getToken")
//        @ResponseBody
//        public ResponseEntity<String> getToken() {
//            // IAMPORT API의 URL
//            String url = "https://api.iamport.kr/users/getToken";
//
//            // IAMPORT API에 전송할 데이터
//            String impKey = "6553563087088256";
//            String impSecret = "de2gHskYCWVk1WnKiIohvR3eNvKKKA6RIQO9DD8XJBivTLrIuLhbu09SMdtl5AxUbsUA71xn8FOI4kkq";
//            String requestBody = "{\"imp_key\": \"" + impKey + "\", \"imp_secret\": \"" + impSecret + "\"}";
//
//            // IAMPORT API 호출을 위한 헤더 설정
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//            // RestTemplate을 사용하여 IAMPORT API 호출
//            RestTemplate restTemplate = new RestTemplate();
//            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
//
//            // IAMPORT API의 응답을 클라이언트에게 반환
//            return response;
//        }
//
//        @PostMapping("/cancel/{registerNum}/{accessToken}")
//        public ResponseEntity<String> cancel(@PathVariable("registerNum") long registerNum, @PathVariable("accessToken") String accessToken) {
//            RegisterVO rvo = ssv.getDetail(registerNum);
//            String merchantUid = rvo.getMerchantUid();
//            log.info(">>> merchantUid of rvo >>> " + merchantUid);
//
//            StorePaymentVO spvo = psv.getImpUidWithMerchantUid(merchantUid);
//            String impUid = spvo.getImpUid();
//            log.info(">>> impUid of spvo >>> " + impUid);
//
//            String url = "https://api.iamport.kr/payments/cancel";
//            String requestBody = "{\"imp_uid\": \"" + impUid + "\", \"merchant_uid\": \"" + merchantUid + "\"}";
//
//            // IAMPORT API 호출을 위한 헤더 설정
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            headers.set("Authorization", accessToken);
//
//            // RestTemplate을 사용하여 IAMPORT API 호출
//            RestTemplate restTemplate = new RestTemplate();
//            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
//
//            // IAMPORT API의 응답을 클라이언트에게 반환
//            return response;
//        }
//
//    /*
//    @PostMapping("/getToken")
//    @ResponseBody
//    public ResponseEntity<String> getToken() {
//        // IAMPORT API의 URL
//        String url = "https://api.iamport.kr/users/getToken";
//
//        // IAMPORT API에 전송할 데이터
//        String impKey = "6553563087088256";
//        String impSecret = "de2gHskYCWVk1WnKiIohvR3eNvKKKA6RIQO9DD8XJBivTLrIuLhbu09SMdtl5AxUbsUA71xn8FOI4kkq";
//        String requestBody = "{\"imp_key\": \"" + impKey + "\", \"imp_secret\": \"" + impSecret + "\"}";
//
//        // IAMPORT API 호출을 위한 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // RestTemplate을 사용하여 IAMPORT API 호출
//        RestTemplate restTemplate = new RestTemplate();
//        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
//        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
//
//        // IAMPORT API의 응답을 클라이언트에게 반환
//        return response;
//    }
//
//    @PostMapping("/cancel/{accessToken}")
//    public ResponseEntity<String> cancel(@PathVariable("accessToken") String accessToken) {
//        String url = "https://api.iamport.kr/payments/cancel";
//        String impUid = "imp_690956879488";
//        String merchantUid = "bizqr1709480955844";
//        String requestBody = "{\"imp_uid\": \"" + impUid + "\", \"merchant_uid\": \"" + merchantUid + "\"}";
//
//        // IAMPORT API 호출을 위한 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("Authorization", accessToken);
//
//        // RestTemplate을 사용하여 IAMPORT API 호출
//        RestTemplate restTemplate = new RestTemplate();
//        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
//        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
//
//        // IAMPORT API의 응답을 클라이언트에게 반환
//        return response;
//    }
//     */
//    }
//
//
//    --------------------------------------------------------------------------------------------------------
//
//    var IMP = window.IMP;
//    IMP.init("imp88712442");
//
//    function requestPay() {
//        let nameVal = document.getElementById('name').value;
//        let emailVal = document.getElementById('email').value;
//        let companyVal = document.getElementById('company').value;
//        let storeNameVal = document.getElementById('storeName').value;
//        let storeAddressVal = document.getElementById('storeAddress').value;
//        let storeTypeVal = document.querySelector('input[name="storeType"]:checked').value;
//        let ownerNumVal = document.getElementById('ownerNum').value;
//        let storeNumVal = document.getElementById('storeNum').value;
//        let subscribeVal = document.querySelector('input[name="subscribe"]:checked').value;
//        let isRegisteredVal = 0;
//
//        let currentDate = new Date();
//
//// 년, 월, 일, 시, 분, 초를 추출
//        let year = currentDate.getFullYear(); // 년
//        let month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // 월 (0부터 시작하므로 +1, 두 자리로 표시)
//        let day = ('0' + currentDate.getDate()).slice(-2); // 일 (두 자리로 표시)
//        let hours = ('0' + currentDate.getHours()).slice(-2); // 시 (두 자리로 표시)
//        let minutes = ('0' + currentDate.getMinutes()).slice(-2); // 분 (두 자리로 표시)
//        let seconds = ('0' + currentDate.getSeconds()).slice(-2); // 초 (두 자리로 표시)
//
//        let nowTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
//
//// 결과 출력
//        console.log(nowTime);
//
//        console.log(nameVal);
//        console.log(emailVal);
//        console.log(companyVal);
//        console.log(storeNameVal);
//        console.log(storeAddressVal);
//        console.log(storeTypeVal);
//        console.log(ownerNumVal);
//        console.log(storeNumVal);
//        console.log(subscribeVal);
//        console.log(isRegisteredVal);
//
//        let merchant_uid = "bizqr" + new Date().getTime();
//        let itemNameVal = subscribeVal === 'monthly' ? '1개월' : '1년';
//        let amountVal = subscribeVal === 'monthly' ? 100 : 1000;
//
//        IMP.request_pay(
//                {
//                pg: "html5_inicis.INIpayTest",
//                pay_method: "card",
//                merchant_uid: merchant_uid,
//                name: itemNameVal,
//                amount: amountVal,
//                buyer_email: emailVal,
//                buyer_name: nameVal,
//                buyer_tel: ownerNumVal,
//                buyer_addr: storeAddressVal,
//                buyer_postcode: "null",
//        },
//        function (rsp) {
//            // callback
//            //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.
//            if(rsp.success){
//                alert('결제 완료. 결제 내역' + rsp.imp_uid);
//
//                let registerData = {
//                        email: emailVal,
//                        name: nameVal,
//                        company: companyVal,
//                        storeName: storeNameVal,
//                        storeAddress: storeAddressVal,
//                        storeType: storeTypeVal,
//                        subscribe: subscribeVal,
//                        ownerNum: ownerNumVal,
//                        storeNum: storeNumVal,
//                        paidTime: nowTime,
//                        merchantUid: merchant_uid
//                };
//
//                postRegisterSuccess(registerData).then(result => {
//                // 신청 db 저장 성공시
//                // 결제 db 저장 시도
//                if(result === '1'){
//                    let data = {
//                            impUid: rsp.imp_uid,
//                            merchantUid: merchant_uid,
//                            buyerEmail: emailVal,
//                            buyerName: nameVal,
//                            buyerCompany: companyVal,
//                            buyerAddress: storeAddressVal,
//                            buyerOwnerTelNum: ownerNumVal,
//                            buyerStoreTelNum: storeNumVal,
//                            itemName: itemNameVal,
//                            itemAmount: amountVal,
//                            paidTime: nowTime
//                        };
//                    postStorePaySuccess(data);
//
//                    window.location.href = '/';
//                }
//                })
//
//            }else{
//                alert('실패' + rsp.error_msg);
//            }
//        }
//    );
//    }
//
//    async function postRegisterSuccess(registerData){
//        try {
//        const url = "/store/registerSuccess";
//        const config = {
//                    method: 'post',
//                    headers: {
//                'content-type':'application/json; charset=utf-8'
//            },
//            body: JSON.stringify(registerData)
//        };
//
//        const resp = await fetch(url, config);
//        const result = await resp.text();
//            return result;
//
//        }catch (error){
//            console.log(error);
//        }
//    }
//
//    function postStorePaySuccess(data){
//        try {
//        const url = "/payment/storePay/success";
//        const config = {
//                    method: 'post',
//                    headers: {
//                'content-type':'application/json; charset=utf-8'
//            },
//            body: JSON.stringify(data)
//        };
//
//            fetch(url, config)
//                    .catch(error => {
//                    console.log("error");
//            })
//        }catch (error){
//            console.log(error);
//        }
//    }
//
//    --------------------------------------------------------------------------------
//
//            package ezen.bizqr.store.controller;
//
//import ezen.bizqr.file.FileHandler;
//import ezen.bizqr.file.FileMapper;
//import ezen.bizqr.file.FileVO;
//import ezen.bizqr.store.domain.*;
//import ezen.bizqr.store.service.StoreService;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.catalina.Store;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//
//    @RequestMapping("/store/*")
//    @Slf4j
//    @Controller
//    @RequiredArgsConstructor
//    public class StoreController {
//        private final StoreService ssv;
//        private final FileHandler fh;
//        private final FileMapper fm;
//
//        @GetMapping("/register")
//        public void storeRegister(){}
//
//        @PostMapping("/register")
//        public String storeRegister(RegisterVO rvo, Model m) {
//            log.info(">>>>> svo 들어온지 확인하자 >>>>> {} " , rvo);
//            //결제 완료 후 db 저장해야함으로 주석처리함 2024-02-26 - cbj
//            //ssv.insertRegister(rvo);
//            m.addAttribute("rvo", rvo);
//            return "/payment/pay";
//        }
//
//        @GetMapping("/create")
//        public String createStoreForm(Model m, @RequestParam("storeId") String storeId) {
//            StoreVO svo = ssv.getDetailFromStore(storeId);
//            m.addAttribute("svo", svo);
//            return "/store/create";
//        }
//
//        @GetMapping("/modify")
//        public String modify(Model model, @RequestParam("storeId") String storeId) {
//            StoreVO svo = ssv.getDetailFromStore(storeId);
//            model.addAttribute("svo", svo);
//            return "/store/modify";
//        }
//
//
//        @GetMapping("/table")
//        public void table(Model model, @RequestParam("storeId") String storeId){
//            StoreVO svo = ssv.getDetailFromStore(storeId);
//            model.addAttribute("svo", svo);
//        }
//
//        @GetMapping("/posPage/{storeId}")
//        public String posPage(Model model, @PathVariable("storeId") long storeId) {
//            log.info("storeId >>> {}", storeId);
//
//            List<TablesVO> list = ssv.getTablesList(storeId);
//
//            for(TablesVO table : list){
//                String tableIdString = table.getTableId();
//                List<OrderHistoryVO> ohlist = ssv.getTableOrderHistory(table.getStoreId(), table.getTableId());
//                table.setOrderHistory(ohlist);
//                int money = 0;
//                for(OrderHistoryVO oh : ohlist){
//                    money += oh.getTotalPrice();
//                }
//                table.setTotalMoney(money);
//                String[] parts = tableIdString.split("_");
//                if(parts.length > 1){
//                    table.setTableId(parts[1]);
//                }
//            }
//            log.info("table list >>> : " + list);
//
//            model.addAttribute("list", list);
//
//            return "/store/posPage";
//        }
//
//        @DeleteMapping("/deleteTableOrderHistory/{storeId}/{combinedTableId}")
//        @ResponseBody
//        public String deleteTableOrder(@PathVariable("storeId") long storeId, @PathVariable("combinedTableId") String combinedTableId){
//            log.info("storeId >>> : " + storeId);
//            log.info("tableId >>> : " + combinedTableId);
//
//            int isOk = ssv.deleteTableOrderHistory(storeId, combinedTableId);
//
//            return isOk > 0 ? "1" : "0";
//        }
//
//
//
//        @PostMapping("/addMenu")
//        public ResponseEntity<String> addMenu(@ModelAttribute MenuItemVO mvo, @RequestParam(name="image", required = false) MultipartFile imageFile) {
//
//            log.info(">>>>>>>>>>mvo >>>>>>> {}", mvo);
//            long MenuId = ssv.insertMenu(mvo);
//
//            FileVO fvo = fh.uploadFile(imageFile);
//            fvo.setMenuId(MenuId);
//            if (!imageFile.isEmpty()) {
//                log.info(">>>>>>>>>>>Received file>>>>>>>>>>>>: " + imageFile.getOriginalFilename());
//                fm.insertFile(fvo);
//            }
//            return ResponseEntity.ok("menu add success");
//        }
//
//        @GetMapping("/store/myStoreList")
//        public String myStoreList(Model model) {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String userEmail = authentication.getName();
//            log.info(">>> userEmail >>> : " + userEmail);
//            List<StoreVO> userStore = ssv.selectEmail(userEmail);
//            log.info(">>> userStore >>> {}", userStore);
//            model.addAttribute("userStore", userStore);
//            return "/store/myStoreList";
//        }
//
//        @PostMapping("/registerSuccess")
//        @ResponseBody
//        public String postRegisterSuccess(@RequestBody RegisterVO rvo){
//
//            log.info(">>> RegisterVO rvo >>> {}", rvo);
//
//            int isOk = ssv.insertRegister(rvo);
//
//            return isOk > 0 ? "1" : "0";
//        }
//
//        @PostMapping("/modify")
//        public String modifyStore(StoreVO svo, @RequestParam("file") MultipartFile file, Model m) {
//            log.info(">>>>>>>>> svo >>>{}", svo);
//            FileVO fvo= fh.uploadStoreImage(file, svo.getStoreId());
//            svo.setLogoImage(fvo.getFileName());
//            ssv.updateStore(svo);
//            m.addAttribute("svo", svo);
//            return "/store/create";
//        }
//
//
//        @GetMapping("/insertTable/{storeId}/{tableNum}")
//        @ResponseBody
//        public String insertTable(@PathVariable("storeId") int storeId, @PathVariable("tableNum") int tableNum){
//            log.info(">>> storeId  >>> {}", storeId);
//            log.info(">>> tableNum  >>> {}", tableNum);
//            int isOk = ssv.insertTables(storeId,tableNum);
//            return isOk > 0 ? "1" : "0";
//        }
//
//        @PostMapping("/saveTablePayHistory")
//        @ResponseBody
//        public String saveTablePay(@RequestBody tablePayHistoryVO tphvo){
//            log.info("saveTablePayHistoryVO >>> tphvo >>> {}", tphvo);
//
//            int isOk = ssv.saveTablePay(tphvo);
//
//            return isOk > 0 ? "1" : "0";
//        }
//    }
//
//}
//
//
//console.log(ordName);
//console.log(ordPhone);
//console.log(ordMemo);
//console.log(payName)
//console.log(totalAmount)
//
//let i=1;
//let uid = '';
//let merchant_uid = 'payment_'+new Date().getTime()+i;
//let itemName = '북토피아 '+payName+'개월 구독권';
//
//function request_pay(){
//    const IMP = window.IMP;
//    IMP.init("imp42245168")
//    IMP.request_pay(
//            {
//                    pg:'kakaopay.TC0ONETIME',
//            pay_method:'card',
//            merchant_uid : merchant_uid , //주문번호
//            name: itemName,
//            amount:totalAmount,
//            buyer_name:ordName,
//            buyer_email:'email',
//            buyer_tel:ordPhone,
//            buyer_addr:'인천광역시 남동구 구월동',
//        },
//    function (rsp){
//        // callback
//        // res.imp_uid 값으로 결제 단건조회 API 호출해서 결제 결과 판단
//        if(rsp.success){
//            console.log('결제성공 boot!');
//
//            let registerData ={
//                    impUid: rsp.impUid,
//                    merchantUid: merchant_uid,
//                    email:'',
//                    name:ordName,
//                    storeName : '북토피아'
//                };
//            console.log(registerData);
//            postRegisterSuccess(registerData).then(result = > {
//                    console.log("result >> "+ result)
//
//            if(result === '1'){
//                let data ={
//                        impUid : rsp.impUid,
//                        merchantUid: merchant_uid,
//                        buyerEmail : 'email',
//                        buyerName : ordName,
//                        itemName :itemName,
//                        itemAmount : totalAmount
//                        };
//                console.log("Data >> "+data);
//                postStorePaySuccess(data);
//
//                window.location.href = '/';
//            } else {
//                console.log("data 안들어옴")
//            }
//                } )
//        } else {
//            alert('실패' + rsp.error_msg);
//        }
//    }
//    );
//    i++;
//}
//
//async function postRegisterSuccess(registerData){
//    try {
//        const url = "/pay/savePayinfo";
//        const config = {
//                method : 'post',
//                headers : {
//            'content-type':'application/json; charset =utf-8'
//        },
//        body :JSON.stringify(registerData)
//        };
//
//        const resp = await fetch(url, config);
//        const result = await resp.text();
//        return result;
//        console.log("registerData >>> " + registerData);
//
//    } catch (error){
//        console.log(error);
//    }
//}
//
//function postStorePaySuccess(data){
//    try {
//        const url = "/pay/successPay";
//        const config ={
//                method: 'post',
//                headers : {
//            'content-type':'application/json; charset =utf-8'
//        },
//        body: JSON.stringify(data)
//        };
//
//        fetch(url, config).catch(error =>{
//                console.log("error");
//        })
//    }catch (error){
//        console.log("error" + error);
//    }
//}
