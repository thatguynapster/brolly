export default async function checkPremium(data: {
  installment: string;
  passenger_count: number;
  type_of_use: string;
  vehicle_value: number;
  whatsapp_number: string;
  year_of_registration: string;
}) {
  // console.log(data);
  const { installment, passenger_count, type_of_use, vehicle_value, whatsapp_number, year_of_registration } = data;

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

  let total_premium_due = base_premium + sum_ncd__fleet_discount + total_tp_premium;

  let initial_premium = 0;

  // console.log(installment);
  if (installment !== "full_payment") {
    let interest_rate = 0;
    let payment_count = 0;
    switch (installment) {
      case "3_months":
        interest_rate = 11 / 100;
        payment_count = Number(installment?.split("_")[0]);
        break;
      case "6_months":
        interest_rate = 20 / 100;
        payment_count = Number(installment?.split("_")[0]);
        break;
      case "9_months":
        interest_rate = 29 / 100;
        payment_count = Number(installment?.split("_")[0]);
        break;
      case "12_months":
        interest_rate = 35 / 100;
        payment_count = Number(installment?.split("_")[0]);
        break;
    }

    let monthly_premium = await _calculate_tmp({
      ir: interest_rate / (payment_count === 12 ? 11 : payment_count),
      np: payment_count === 12 ? 11 : payment_count,
      pv: total_premium_due - total_premium_due / payment_count,
      fv: 0,
      type: 0,
    });
    // console.log(monthly_premium);
    initial_premium = total_premium_due / Number(installment?.split("_")[0]);
    total_premium_due = monthly_premium;
  }

  let res_message = installment?.replace("_", " ");
  return {
    code: 200,
    message: `Premium calculated for ${res_message}`,
    total_premium_due,
    initial_premium,
  };
}

const _calculate_tmp = async (data: {
  ir?: number; // interest rate per month
  np?: number; // number of periods (months)
  pv?: number; // present value
  fv?: number; // future value
  type?: number; //when the payments are due: 0: end of the period (default), 1: beginning of period
}) => {
  // console.log(data);
  let { ir = 35 / 100 / 11, np = 11, pv = 2130.06, fv = 0, type = 0 } = data;
  // console.log(ir, np, pv, fv, type);

  var pmt, pvif;

  fv || (fv = 0);
  type || (type = 0);

  if (ir === 0) return -(pv + fv) / np;

  pvif = Math.pow(1 + ir, np);
  pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + ir;

  return -pmt;
};
