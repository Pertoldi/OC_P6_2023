package mdd.api.back.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SUBSCRIPTIONS")
@IdClass(SubscriptionId.class) // specifying the class for the composite primary key
public class Subscription {

  @Id
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @Id
  @ManyToOne
  @JoinColumn(name = "subject_id")
  private Subject subject;

  @Column(name = "subscription_date")
  private LocalDateTime subscriptionDate;

  @PrePersist
  protected void onCreate() {
    subscriptionDate = LocalDateTime.now();
  }
}