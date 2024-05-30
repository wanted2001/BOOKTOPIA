package com.booktopia.www.config;

import com.booktopia.www.security.CustomUserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
                .cors(cors->cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/","/index","/user/login","/user/join","/booktopia/info","/js/**","/dist/**").permitAll()
                        .requestMatchers("/subcribe/info").hasRole("ADMIN").anyRequest().permitAll()
                )
                .formLogin(login -> login
                        .usernameParameter("id")
                        .passwordParameter("pwd")
                        .loginPage("/user/login")// form 방식 로그인 사용
                        .defaultSuccessUrl("/user/myPage", true) // 성공 시 dashboard로
                        .permitAll()    // 대시보드 이동이 막히면 안되므로 얘는 허용
                )
                .logout(logout-> logout
                        .logoutUrl(("/user/logout"))
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessUrl("/")
                );  // 로그아웃은 기본설정으로 (/logout으로 인증해제)

        return http.build();
    }

    @Bean
    UserDetailsService userDetailsService(){
        return new CustomUserService(); // Security 패키지에 클래스로 생성
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}