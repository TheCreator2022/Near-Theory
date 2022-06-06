import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "near_theory_old";
var name = "Near Theory";
var description = "This older version what what...";
var authors = "The Creator";
var version = 1;

var currency;
var c1, c2, c3, q1, q2, q3, s1, s2, s3, s4;
var c1Exp, c2Exp;

var achievement1, achievement2, achievement3, achievement4, achievement5, achievement6, achievement7, achievement8, achievement9;
var chapter1, chapter2;

var init = () => {
    currency = theory.createCurrency("N", "N");
    currency_SUS = theory.createCurrency("S", "S");

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        c1.getDescription = (_) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(1, currency, new ExponentialCost(5, Math.log2(10)));
        c2.getDescription = (_) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=4^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC3(level).toString(0);
        c3 = theory.createUpgrade(2, currency, new ExponentialCost(500, Math.log2(100)));
        c3.getDescription = (_) => Utils.getMath(getDesc(c3.level));
        c3.getInfo = (amount) => Utils.getMathTo(getInfo(c3.level), getInfo(c3.level + amount));
        c3.maxLevel = 1500;
    }

    // q1
    {
        let getDesc = (level) => "q_1=2.5^{" + level + "}";
        let getInfo = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(3, currency, new ExponentialCost(2e5, Math.log2(6)));
        q1.getDescription = (_) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getInfo(q1.level), getInfo(q1.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=10^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ2(level).toString(0);
        q2 = theory.createUpgrade(4, currency, new ExponentialCost(1.1e7, Math.log2(999)));
        q2.getDescription = (_) => Utils.getMath(getDesc(q2.level));
        q2.getInfo = (amount) => Utils.getMathTo(getInfo(q2.level), getInfo(q2.level + amount));
    }

    // q3
    {
        let getDesc = (level) => "q_3=2^{" + level + "}";
        let getInfo = (level) => "q_3=" + getQ3(level).toString(0);
        q3 = theory.createUpgrade(5, currency, new ExponentialCost(1.1e9, Math.log2(6)));
        q3.getDescription = (_) => Utils.getMath(getDesc(q3.level));
        q3.getInfo = (amount) => Utils.getMathTo(getInfo(q3.level), getInfo(q3.level + amount));
    }

    // s1
    {
        let getDesc = (level) => "s_1=2^{" + level + "}";
        let getInfo = (level) => "s_1=" + getS1(level).toString(0);
        s1 = theory.createUpgrade(6, currency, new ExponentialCost(1.79e308, Math.log2(1e100)));
        s1.getDescription = (_) => Utils.getMath(getDesc(s1.level));
        s1.getInfo = (amount) => Utils.getMathTo(getInfo(s1.level), getInfo(s1.level + amount));
    }

    // s2
    {
        let getDesc = (level) => "s_2=666^{" + level + "}";
        let getInfo = (level) => "s_2=" + getS2(level).toString(0);
        s2 = theory.createUpgrade(7, currency_SUS, new ExponentialCost(10000, Math.log2(2)));
        s2.getDescription = (_) => Utils.getMath(getDesc(s2.level));
        s2.getInfo = (amount) => Utils.getMathTo(getInfo(s2.level), getInfo(s2.level + amount));
    }

     // s3
     {
        let getDesc = (level) => "s_3=(10^{150})^{" + level + "}";
        let getInfo = (level) => "s_3=" + getS3(level).toString(0);
        s3 = theory.createUpgrade(8, currency_SUS, new ExponentialCost(1e8, Math.log2(10)));
        s3.getDescription = (_) => Utils.getMath(getDesc(s3.level));
        s3.getInfo = (amount) => Utils.getMathTo(getInfo(s3.level), getInfo(s3.level + amount));
    }

    // s4
    {
        let getDesc = (level) => "s_4=3^{" + level + "}";
        let getInfo = (level) => "s_4=" + getS4(level).toString(0);
        s4 = theory.createUpgrade(9, currency_SUS, new ExponentialCost(1e308, Math.log2(1e200)));
        s4.getDescription = (_) => Utils.getMath(getDesc(s4.level));
        s4.getInfo = (amount) => Utils.getMathTo(getInfo(s4.level), getInfo(s4.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e9);
    theory.createBuyAllUpgrade(1, currency, 1e20);
    theory.createAutoBuyerUpgrade(2, currency, 1e48);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(10, 6));

    {
        c1Exp = theory.createMilestoneUpgrade(0, 3);
        c1Exp.description = Localization.getUpgradeIncCustomExpDesc("c_1", "0.05");
        c1Exp.info = Localization.getUpgradeIncCustomExpInfo("c_1", "0.05");
        c1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c2Exp = theory.createMilestoneUpgrade(1, 3);
        c2Exp.description = Localization.getUpgradeIncCustomExpDesc("c_2", "0.05");
        c2Exp.info = Localization.getUpgradeIncCustomExpInfo("c_2", "0.05");
        c2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c3Exp = theory.createMilestoneUpgrade(2, 3);
        c3Exp.description = Localization.getUpgradeIncCustomExpDesc("c_3", "0.05");
        c3Exp.info = Localization.getUpgradeIncCustomExpInfo("c_3", "0.05");
        c3Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        q1Exp = theory.createMilestoneUpgrade(3, 3);
        q1Exp.description = Localization.getUpgradeIncCustomExpDesc("q_1", "0.05");
        q1Exp.info = Localization.getUpgradeIncCustomExpInfo("q_1", "0.05");
        q1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
    
    /////////////////
    //// Achievements
    let infiniteslow1 = 1.79
    let infiniteslow2 = 179
    let infiniteslow3 = 1.79e38
    let infinite = 1.79e308

    achievement1 = theory.createAchievement(0, "Eee", "Start.", () => c1.level > 0);
    achievement2 = theory.createAchievement(1, "5", "Buy 5 c1.", () => c1.level > 4);
    achievement3 = theory.createAchievement(2, "Wow", "1 c2.", () => c2.level > 0);
    achievement4 = theory.createAchievement(3, "Cool", "100000000 near this get", () => currency.value > 100000000);
    achievement5 = theory.createAchievement(4, "achear", "ahhhhhh 1e69 is funny.", () => currency.value > 1e69);
    achievement6 = theory.createAchievement(5, "you win", "reaching this get from paraters get nowhere get this reach \u221EN?", () => currency_SUS.value > 308.2);
    achievement7 = theory.createAchievement(6, "Somenthing Strange Notation?", "Reach 1e10000 N (somehow?) this funny", () => currency_SUS.value > 10000);
    achievement8 = theory.createAchievement(7, "Text Kaineka Long", "Reach 1e666,666,666 N this game what", () => currency_SUS.value > 666666666);
    achievement9 = theory.createAchievement(8, "Get to avabile this upgrade", "what", () => s4.level > 0);

    ///////////////////
    //// Story chapters
    chapter1 = theory.createStoryChapter(0, "My First Chapter", "This is line 1,\nand this is line 2.\n\nNice.", () => c1.level > 0);
    chapter2 = theory.createStoryChapter(1, "My Second Chapter", "This is line 1 again,\nand this is line 2... again.\n\nNice again.", () => c2.level > 0);
    chapter3 = theory.createStoryChapter(2, "\u00AF|\u00AF aaaa", "UUUUUUUUUU \n\u7777 \n\u7777 \n\u7777 \n\u7777 \n\u7777 \nwhT", () => s4.level > 0);

    updateAvailability();
}

var updateAvailability = () => {
    c2Exp.isAvailable = c1Exp.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency_SUS = BigNumber.from(0);
    currency.value += dt * bonus * getC1(c1.level).pow(getC1Exponent(c1Exp.level)) *
                                   getC2(c2.level).pow(getC2Exponent(c2Exp.level)) *
                                   getC3(c3.level).pow(getC3Exponent(c3Exp.level)) *
                                   getQ1(q1.level).pow(getQ1Exponent(q1Exp.level)) *
                                   getQ2(q2.level) *
                                   getQ3(q3.level) *
                                   getS1(s1.level) *
                                   getS2(s2.level) *
                                   getS3(s3.level) *
                                   getS4(s4.level);
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = c_1";

    if (c1Exp.level == 1) result += "^{1.05}";
    if (c1Exp.level == 2) result += "^{1.1}";
    if (c1Exp.level == 3) result += "^{1.15}";

    result += "c_2";

    if (c2Exp.level == 1) result += "^{1.05}";
    if (c2Exp.level == 2) result += "^{1.1}";
    if (c2Exp.level == 3) result += "^{1.15}";

    result += "c_3";

    if (c3Exp.level == 1) result += "^{1.05}";
    if (c3Exp.level == 2) result += "^{1.1}";
    if (c3Exp.level == 3) result += "^{1.15}";

    result += "q_1";

    if (q1Exp.level == 1) result += "^{1.05}";
    if (q1Exp.level == 2) result += "^{1.1}";
    if (q1Exp.level == 3) result += "^{1.15}";


    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.231) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.164}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => 2;

var getC1 = (level) => Utils.getStepwisePowerSum(level, 3, 10, 0);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC3 = (level) => BigNumber.from(4).pow(level);
var getQ1 = (level) => BigNumber.from(2.5).pow(level);
var getQ2 = (level) => BigNumber.from(10).pow(level);
var getQ3 = (level) => BigNumber.TWO.pow(level);
var getS1 = (level) => BigNumber.TWO.pow(level);
var getS2 = (level) => BigNumber.from(666).pow(level);
var getS3 = (level) => BigNumber.from(1e150).pow(level);
var getS4 = (level) => BigNumber.from(3).pow(level);
var getC1Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getC2Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getC3Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getQ1Exponent = (level) => BigNumber.from(1 + 0.05 * level);

init();
