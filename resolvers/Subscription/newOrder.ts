import SUBSCRIPTION_TYPE from "../../const/Subscription";

export const handler = {
  subscribe: (_, __, { pubSub }) =>
    pubSub.subscribe(SUBSCRIPTION_TYPE.newOrder),
  resolve: (payload) => {
    console.log(payload);
    return payload;
  },
};
