import * as React from "react";
import {StyleSheet, View, Text, Image} from "react-native";
// Import sale_report images
const calendarImg = require("../../assets/sale_report/calendar.jpg");
const filterImg = require("../../assets/sale_report/filter.jpg");
const arrowImg = require("../../assets/sale_report/Arrow 2.png");
const pdfIcon = require("../../assets/sale_report/pdf_icon.jpg");
const xlsIcon = require("../../assets/sale_report/xls_icon.jpg");
const dropDownImg = require("../../assets/sale_report/drop down.jpg");
import { SafeAreaView } from "react-native-safe-area-context";
// Remove invalid Component import

const SaleReport = () => {
  return (
    <SafeAreaView style={styles.viewBg}>
      <View style={[styles.view, styles.viewBg]}>
        <View style={[styles.child, styles.childPosition1]} />
        <Text style={[styles.saleReport2, styles.saleReport2Typo]}>{`Sale Report `}</Text>
  {/* Top left arrow icon */}
  <Image source={arrowImg} style={styles.item} resizeMode="contain" />
        <View style={[styles.inner, styles.childPosition1]} />
        <Text style={[styles.to30092025, styles.filtersTypo]}>01/09/2025       TO      30/09/2025</Text>
        <View style={[styles.lineView, styles.viewBorder]} />
        <Text style={[styles.thisMonth, styles.filtersTypo]}>This Month</Text>
  {/* Drop down icon for month selection */}
  <Image source={dropDownImg} style={styles.saleReportChild} resizeMode="contain" />
  {/* Drop down icon for date range */}
  <Image source={dropDownImg} style={styles.rectangleIcon} resizeMode="contain" />
  {/* Calendar icon next to date range */}
  <Image source={calendarImg} style={[styles.rectangleIcon, { left: 145, top: 78 }]} resizeMode="contain" />
  {/* XLS icon for filters button (swapped) */}
  <Image source={xlsIcon} style={styles.child9} resizeMode="contain" />
        <Text style={[styles.filtersApplied, styles.saleReport2Typo]}>Filters Applied:</Text>
        <View style={[styles.rectangleView, styles.viewBorder]} />
  <Text style={[styles.filters, styles.filtersTypo]}>Filters</Text>
  <Image source={filterImg} style={{ position: 'absolute', top: 134, left: 375, width: 18, height: 18 }} resizeMode="contain" />
        <View style={[styles.roundedRectangle, styles.child2Layout]} />
        <View style={[styles.child2, styles.child2Layout]} />
        <Text style={[styles.txnsType, styles.txnsTypeTypo]}>{`Txns Type - Sale & Cr.  Note`}</Text>
        <Text style={[styles.partyAll, styles.txnsTypeTypo]}>Party - All Party</Text>
        <View style={[styles.child3, styles.childLayout]} />
        <View style={[styles.child4, styles.childLayout]} />
        <Text style={[styles.text, styles.textTypo1]}>₹ 100.00</Text>
        <View style={[styles.child5, styles.childLayout]} />
        <Text style={[styles.saleReportText, styles.filtersTypo]}>₹ 0.00</Text>
        <View style={styles.child6} />
        <Text style={[styles.sale1, styles.sale1Typo]}>SALE 1</Text>
        <Text style={[styles.harshalThakare, styles.filtersTypo]}>Harshal Thakare</Text>
        <Text style={[styles.noOfTxns, styles.text2Typo]}>No of Txns</Text>
        <Text style={[styles.totalSale, styles.noOfTxnsPosition]}>Total Sale</Text>
        <Text style={[styles.balanceDue, styles.noOfTxnsPosition]}>Balance Due</Text>
        <Text style={[styles.text2, styles.text2Typo]}>1</Text>
        <Text style={[styles.sep25, styles.sale1Typo]}>04 SEP, 25</Text>
        <Text style={[styles.amount, styles.amountTypo]}>Amount</Text>
        <Text style={[styles.balance, styles.amountTypo]}>Balance</Text>
        <Text style={[styles.text3, styles.textTypo]}>₹ 100.00</Text>
        <Text style={[styles.text4, styles.textTypo]}>₹ 0.00</Text>
  {/* XLS icon for export (swapped) */}
  <Image source={xlsIcon} style={styles.child7} resizeMode="contain" />
  {/* PDF icon for export (swapped) */}
  <Image source={pdfIcon} style={[styles.child8, styles.childPosition]} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saleReport: {
    flex: 1,
    backgroundColor: "#d3e4f4"
  },
  viewBg: {
    backgroundColor: "#d3e4f4",
    flex: 1
  },
  childPosition1: {
    width: 412,
    left: 0,
    backgroundColor: "#fff",
    position: "absolute"
  },
  saleReport2Typo: {
    textAlign: "left",
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    color: "#000",
    position: "absolute"
  },
  filtersTypo: {
    fontFamily: "Inter-Regular",
    textAlign: "left",
    position: "absolute"
  },
  viewBorder: {
    borderColor: "#000",
    borderStyle: "solid",
    position: "absolute"
  },
  child2Layout: {
    height: 29,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    top: 163,
    position: "absolute"
  },
  txnsTypeTypo: {
    opacity: 0.5,
    top: 170,
    fontSize: 12,
    textAlign: "left",
    color: "#000",
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    position: "absolute"
  },
  childLayout: {
    height: 52,
    width: 116,
    borderRadius: 5,
    top: 223,
    backgroundColor: "#fff",
    position: "absolute"
  },
  textTypo1: {
    left: 159,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    textAlign: "left",
    color: "#000",
    position: "absolute"
  },
  sale1Typo: {
    fontSize: 11,
    opacity: 0.5,
    fontFamily: "Inter-Regular",
    textAlign: "left",
    color: "#000",
    position: "absolute"
  },
  text2Typo: {
    left: 34,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    textAlign: "left",
    color: "#000",
    position: "absolute"
  },
  noOfTxnsPosition: {
    top: 232,
    opacity: 0.6
  },
  amountTypo: {
    fontSize: 13,
    top: 338,
    opacity: 0.5,
    fontFamily: "Inter-Regular",
    textAlign: "left",
    color: "#000",
    position: "absolute"
  },
  textTypo: {
    top: 354,
    opacity: 0.5,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    textAlign: "left",
    color: "#000",
    position: "absolute"
  },
  childPosition: {
    top: 19,
    height: 29,
    position: "absolute"
  },
  view: {
    width: "100%",
    height: 875,
    overflow: "hidden"
  },
  child: {
    top: 0,
    height: 73
  },
  saleReport2: {
    top: 21,
    left: 60,
    fontSize: 22
  },
  item: {
    top: 34,
    width: 25,
    height: 0,
    opacity: 0.8,
    left: 18,
    position: "absolute"
  },
  inner: {
    top: 77,
    height: 133
  },
  to30092025: {
    left: 195,
    opacity: 0.6,
    fontSize: 12,
    fontFamily: "Inter-Regular",
    top: 88,
    color: "#000"
  },
  lineView: {
    left: 146,
    borderRightWidth: 1,
    width: 1,
    height: 28,
    opacity: 0.2,
    top: 82
  },
  thisMonth: {
    opacity: 0.6,
    fontSize: 12,
    fontFamily: "Inter-Regular",
    top: 88,
    color: "#000",
    left: 18
  },
  rectangleIcon: {
    top: 78,
    left: 110,
    width: 35,
    height: 34,
    position: "absolute"
  },
  saleReportChild: {
    height: 27,
    width: 30,
    left: 149,
    top: 82,
    position: "absolute"
  },
  filtersApplied: {
    top: 130,
    fontSize: 14,
    opacity: 0.7,
    left: 18
  },
  rectangleView: {
    top: 132,
    left: 320,
    borderRadius: 15,
    borderWidth: 1,
    width: 76,
    height: 22,
    opacity: 0.6,
    backgroundColor: "#fff"
  },
  filters: {
    top: 134,
    left: 354,
    opacity: 0.6,
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#000"
  },
  roundedRectangle: {
    width: 197,
    left: 18
  },
  child2: {
    left: 227,
    width: 156
  },
  txnsType: {
    left: 37
  },
  partyAll: {
    left: 260
  },
  child3: {
    left: 23
  },
  child4: {
    left: 149
  },
  text: {
    top: 251
  },
  child5: {
    left: 275
  },
  saleReportText: {
    left: 287,
    color: "#028a06",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4
    },
    textShadowRadius: 4,
    top: 251,
    fontSize: 12,
    fontFamily: "Inter-Regular"
  },
  child6: {
    top: 286,
    borderRadius: 8,
    width: 368,
    height: 95,
    left: 23,
    backgroundColor: "#fff",
    position: "absolute"
  },
  sale1: {
    left: 335,
    top: 297
  },
  harshalThakare: {
    fontSize: 15,
    left: 31,
    top: 297,
    color: "#000"
  },
  noOfTxns: {
    top: 232,
    opacity: 0.6
  },
  totalSale: {
    left: 159,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    textAlign: "left",
    color: "#000",
    position: "absolute"
  },
  balanceDue: {
    left: 284,
    fontFamily: "Inter-Regular",
    textAlign: "left",
    position: "absolute",
    fontSize: 12,
    color: "#000"
  },
  text2: {
    top: 251
  },
  sep25: {
    top: 310,
    left: 314
  },
  amount: {
    left: 31
  },
  balance: {
    left: 168
  },
  text3: {
    left: 32
  },
  text4: {
    left: 170
  },
  child7: {
    top: 136,
    left: 333,
    width: 17,
    height: 13,
    position: "absolute"
  },
  child8: {
    left: 309,
    width: 30
  },
  child9: {
    left: 358,
    width: 34
  }
});

export default SaleReport;
