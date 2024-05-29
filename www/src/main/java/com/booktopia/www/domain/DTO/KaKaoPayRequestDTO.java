package com.booktopia.www.domain.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KaKaoPayRequestDTO {
    private String cid;
    private String partner_order_id;
    private String partner_user_id;
    private String item_name;
    private String quantity;
    private String total_amount;
    private String tax_free_amount;
    private String approval_url;
    private String cancel_url;
    private String fail_url;
}
