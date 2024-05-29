package com.booktopia.www.domain.DTO;

import com.booktopia.www.domain.PayVO;
import com.booktopia.www.domain.SubscribeInfoVO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderPayDTO {
    private String id; //주문자아이디
    private String ordName; //주문자이름
    private String ordPhone; //주문자전화번호
    private String ordAddr; //주문자주소
    private String ordAddrDetail; //주문자상세주소
    private String ordMemo; //주문주배송메모
    private List<PayVO> payList;
}
