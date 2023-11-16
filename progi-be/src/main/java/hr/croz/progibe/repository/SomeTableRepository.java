package hr.croz.progibe.repository;

import hr.croz.progibe.entity.SomeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface SomeTableRepository extends JpaRepository<SomeTable, BigInteger> {

}
