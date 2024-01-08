package mdd.api.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mdd.api.back.model.Subscription;
import mdd.api.back.model.SubscriptionId;
import mdd.api.back.model.User;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, SubscriptionId> {

  List<Subscription> findByUser(User user);

}