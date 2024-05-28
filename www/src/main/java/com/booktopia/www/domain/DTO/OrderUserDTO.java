package com.booktopia.www.domain.DTO;

import com.booktopia.www.domain.OrderInfoVO;
import com.booktopia.www.domain.SubscribeInfoVO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderUserDTO {
    //getPay페이지에서 받아오는 주문정보에 구독권정보까지 담은 DTO
    private String id; //주문자아이디
    private String ordName; //주문자이름
    private String ordPhone; //주문자전화번호
    private String ordAddr; //주문자주소
    private String ordAddrDetail; //주문자상세주소
    private String ordMemo; //주문주배송메모
    private List<SubscribeInfoVO> sublist; //구독권번호

    public OrderUserDTO(OrderInfoVO oivo, List<SubscribeInfoVO> sublist) {
    }
}
