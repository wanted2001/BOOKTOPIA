package com.booktopia.www.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    /* springSecurity6 => createDelegationPasswordEncoder*/

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    //SecurityFilterChain 객체로 설정
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf->csrf.disable())
                .authorizeHttpRequests(request -> request

                        .anyRequest().permitAll()   // 어떠한 요청이라도 인증필요
                )
                .formLogin(login -> login   // form 방식 로그인 사용
                        .defaultSuccessUrl("/view/dashboard", true) // 성공 시 dashboard로
                        .permitAll()    // 대시보드 이동이 막히면 안되므로 얘는 허용
                )
                .logout(logout-> logout
                        .logoutUrl("/index")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessUrl("/index")
                );  // 로그아웃은 기본설정으로 (/logout으로 인증해제)
        http.cors();
        return http.build();
    }
}