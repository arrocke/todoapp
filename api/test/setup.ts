import "config/pg";
import DomainEventBus from "core/DomainEventBus";

beforeEach(() => {
  DomainEventBus.clearHandlers();
});