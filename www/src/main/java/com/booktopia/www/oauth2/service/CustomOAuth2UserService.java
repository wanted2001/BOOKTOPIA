package com.booktopia.www.oauth2.service;

import com.booktopia.www.domain.AuthVO;
import com.booktopia.www.domain.UserVO;
import com.booktopia.www.oauth2.exception.OAuth2AuthenticationProcessingException;
import com.booktopia.www.oauth2.user.OAuth2UserInfo;
import com.booktopia.www.oauth2.user.OAuth2UserInfoFactory;
import com.booktopia.www.repository.UserMapper;
import com.booktopia.www.security.AuthUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }
    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String accessToken = userRequest.getAccessToken().getTokenValue();

        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, accessToken, oAuth2User.getAttributes());

        // OAuth2UserInfo field value validation
        if (!StringUtils.hasText(oAuth2UserInfo.getId())) {
            throw new OAuth2AuthenticationProcessingException("OAuth2 no id");
        }
        if (!StringUtils.hasText(oAuth2UserInfo.getPwd())) {
            throw new OAuth2AuthenticationProcessingException("OAuth2 no pwd");
        }
        if (!StringUtils.hasText(oAuth2UserInfo.getName())) {
            throw new OAuth2AuthenticationProcessingException("OAuth2 no name");
        }
        return new OAuth2UserPrincipal(oAuth2UserInfo);
    }
}
