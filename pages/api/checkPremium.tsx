// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  code: number;
  message: string;
  total_premium_due: number;
};

export default function checkPremium(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { installment_count, passenger_count, type_of_use, vehicle_value, whatsapp_number, year_of_registration } =
    JSON.parse(req.body);
  console.log(JSON.parse(req.body));

  // calculate comprehensive insurance
  // let comprehensive=

  //fixed rates
  let tp_basic_premium = 320;
  let extra_seat_loading_value = 5;
  let tppdl = 5_000;

  let damage_rate: number = 0;
  // determine damage rate by type of use
  switch (type_of_use) {
    case "own_goods":
      damage_rate = 4 / 100; // 4%
      break;
    case "private_individual":
      damage_rate = 5 / 100; // 5%
      break;
    case "private_company":
      damage_rate = 6 / 100; // 6%
      break;
    case "ride_hail":
    case "hiring_car":
    case "taxi":
    case "omni_bus":
    case "general_cartage":
      damage_rate = 7 / 100; // 7%
      break;
  }

  // calculate base premium
  const base_premium = Number((vehicle_value * damage_rate).toFixed(2));

  let ncd_rate = 0;
  // determine ncd rate by year of registration
  switch (year_of_registration) {
    case "2022":
      ncd_rate = 0;
      break;
    case "2021":
      ncd_rate = 25 / 100; // 25%
      break;
    case "2020":
      ncd_rate = 35 / 100; // 35%
      break;
    case "2019":
      ncd_rate = 40 / 100; // 40%
      break;
    case "2018":
      ncd_rate = 45 / 100; // 45%
      break;
    case "2017":
      ncd_rate = 50 / 100; // 50%
      break;
    case "before_2017":
      ncd_rate = 50 / 100; // 50%
      break;
  }

  const fleet_discount_rate = 10 / 100; //10%

  const ncd = Number(((base_premium + tp_basic_premium) * ncd_rate).toFixed(2));
  const fleet_discount = Number(((base_premium + -ncd) * fleet_discount_rate).toFixed(2));
  const sum_ncd__fleet_discount = -(ncd + fleet_discount);

  const extra_seat_loading = (passenger_count - extra_seat_loading_value) * 2;
  const additional_peril = 5;
  const ecowas_peril = 5;
  const pa_benefits = 20;
  const motor_contribution = 25;

  const total_tp_premium =
    tp_basic_premium + extra_seat_loading + additional_peril + ecowas_peril + pa_benefits + motor_contribution;

  const total_premium_due = base_premium + sum_ncd__fleet_discount + total_tp_premium;

  let res_message = installment_count.replace("_", " ");
  res.status(200).json({
    code: 200,
    message: `Premium calculated for ${res_message}`,
    total_premium_due,
  });
}
