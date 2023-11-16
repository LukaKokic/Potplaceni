package hr.croz.progibe.controller;

import hr.croz.progibe.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@RestController
@RequestMapping("/test")
@PropertySource(value = "classpath:application.properties")
public class TestController {

    private final DataService dataService;

    // Dohvaca se iz application.properties, pogledati liniju 15
    @Value("${message}")
    private String message;

    @Autowired
    public TestController(final DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public String get() {
        return message + dataService.getData(BigInteger.ONE);
    }
}
