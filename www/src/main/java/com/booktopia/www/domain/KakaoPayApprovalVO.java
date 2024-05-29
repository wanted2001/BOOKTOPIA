package com.booktopia.www.domain;

import lombok.Data;

import java.util.Date;

@Data
public class KakaoPayApprovalVO {
    private String aid,tid,cid,sid;
    private String partner_order_id, partner_user_id;
    private AmountVO amount;
    private String item_name, item_code,payload;
    private Date created_at,approved_at;
}
