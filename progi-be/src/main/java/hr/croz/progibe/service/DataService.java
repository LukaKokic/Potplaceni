package hr.croz.progibe.service;

import hr.croz.progibe.repository.SomeTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Service
public class DataService {
    private final SomeTableRepository someTableRepository;

    @Autowired
    public DataService(final SomeTableRepository someTableRepository) {
        this.someTableRepository = someTableRepository;
    }

    public String getData(final BigInteger id) {
        return someTableRepository.findById(id).get().getSomedata();
    }
}
