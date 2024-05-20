import { WizIAdd } from "./add";
import { WizIAddCircle } from "./add-circle";
import { WizIAdjust } from "./adjust";
import { WizIApprovalFilled } from "./approval-filled";
import { WizIArrowDownward } from "./arrow-downward";
import { WizIArrowDropDown } from "./arrow-drop-down";
import { WizIArrowDropUp } from "./arrow-drop-up";
import { WizIArrowRight } from "./arrow-right";
import { WizIArrowUpward } from "./arrow-upward";
import { WizIAssignment } from "./assignment";
import { WizIAssignmentAdd } from "./assignment-add";
import { WizIAttachFile } from "./attach-file";
import { WizIAutoRenew } from "./auto-renew";
import { WizIBarChart4Bars } from "./bar-chart-4-bars";
import { WizIBook } from "./book";
import { WizIBrightFilled } from "./bright-filled";
import { WizIBusinessCenter } from "./business-center";
import { WizICalendar } from "./calendar";
import { WizICamera } from "./camera";
import { WizICancel } from "./cancel";
import { WizIChangeHistory } from "./change-history";
import { WizIChat } from "./chat";
import { WizIChatBubbleFilled } from "./chat-bubble-filled";
import { WizICheck } from "./check";
import { WizICheckBold } from "./check-bold";
import { WizICheckCircleFilled } from "./check-circle-filled";
import { WizIChevronLeft } from "./chevron-left";
import { WizIChevronLeftBold } from "./chevron-left-bold";
import { WizIChevronRight } from "./chevron-right";
import { WizIChevronRightBold } from "./chevron-right-bold";
import { WizICircle } from "./circle";
import { WizICircleCheck } from "./circle-check";
import { WizIClose } from "./close";
import { WizICloseBold } from "./close-bold";
import { WizIContactPageFilled } from "./contact-page-filled";
import { WizIContentCopy } from "./content-copy";
import { WizIContract } from "./contract";
import { WizIDashboard } from "./dashboard";
import { WizIDelete } from "./delete";
import { WizIDemography } from "./demography";
import { WizIDescription } from "./description";
import { WizIDomain } from "./domain";
import { WizIDownload } from "./download";
import { WizIDraft } from "./draft";
import { WizIDrafts } from "./drafts";
import { WizIEditNote } from "./edit-note";
import { WizIEmergencyHome } from "./emergency-home";
import { WizIExpandLess } from "./expand-less";
import { WizIExpandMore } from "./expand-more";
import { WizIExpandMoreBold } from "./expand-more-bold";
import { WizIEye } from "./eye";
import { WizIFamilyHome } from "./family-home";
import { WizIFeedback } from "./feedback";
import { WizIForwardToInbox } from "./forward-to-inbox";
import { WizIGroups } from "./groups";
import { WizIHelp } from "./help";
import { WizIHistory } from "./history";
import { WizIHome } from "./home";
import { WizIHourglassTop } from "./hourglass-top";
import { WizIInboxCustomize } from "./inbox-customize";
import { WizIInfo } from "./info";
import { WizIInfoBold } from "./info-bold";
import { WizIInfoFilled } from "./info-filled";
import { WizILocationCity } from "./location-city";
import { WizILocationOn } from "./location-on";
import { WizILogin } from "./login";
import { WizIMail } from "./mail";
import { WizIManageAccounts } from "./manage-accounts";
import { WizIMenu } from "./menu";
import { WizIMenuOpen } from "./menu-open";
import { WizIMonitoring } from "./monitoring";
import { WizIMoreVert } from "./more-vert";
import { WizINoteAdd } from "./note-add";
import { WizINotification } from "./notification";
import { WizIOpenInNew } from "./open-in-new";
import { WizIPersonFilled } from "./person-filled";
import { WizIPieChart } from "./pie-chart";
import { WizIPinDrop } from "./pin-drop";
import { WizIPublic } from "./public";
import { WizIRemove } from "./remove";
import { WizIRemoveBold } from "./remove-bold";
import { WizIReviews } from "./reviews";
import { WizISchedule } from "./schedule";
import { WizISearch } from "./search";
import { WizISend } from "./send";
import { WizISettings } from "./settings";
import { WizIShoppingmode } from "./shoppingmode";
import { WizISmartphone } from "./smartphone";
import { WizIStarFilled } from "./star-filled";
import { WizIStars } from "./stars";
import { WizIStoreFront } from "./store-front";
import { WizITab } from "./tab";
import { WizITask } from "./task";
import { WizITimerFilled } from "./timer-filled";
import { WizIUpload } from "./upload";
import { WizIWarning } from "./warning";

export type TIcon =
  | typeof WizIAddCircle
  | typeof WizIAdd
  | typeof WizIAdjust
  | typeof WizIApprovalFilled
  | typeof WizIArrowDownward
  | typeof WizIArrowDropDown
  | typeof WizIArrowDropUp
  | typeof WizIArrowRight
  | typeof WizIArrowUpward
  | typeof WizIAssignmentAdd
  | typeof WizIAssignment
  | typeof WizIAttachFile
  | typeof WizIAutoRenew
  | typeof WizIBarChart4Bars
  | typeof WizIBook
  | typeof WizIBrightFilled
  | typeof WizIBusinessCenter
  | typeof WizICalendar
  | typeof WizICamera
  | typeof WizICancel
  | typeof WizIChangeHistory
  | typeof WizIChatBubbleFilled
  | typeof WizIChat
  | typeof WizICheckBold
  | typeof WizICheckCircleFilled
  | typeof WizICheck
  | typeof WizIChevronLeftBold
  | typeof WizIChevronLeft
  | typeof WizIChevronRightBold
  | typeof WizIChevronRight
  | typeof WizICircleCheck
  | typeof WizICircle
  | typeof WizICloseBold
  | typeof WizIClose
  | typeof WizIContactPageFilled
  | typeof WizIContentCopy
  | typeof WizIContract
  | typeof WizIDashboard
  | typeof WizIDelete
  | typeof WizIDemography
  | typeof WizIDescription
  | typeof WizIDomain
  | typeof WizIDownload
  | typeof WizIDraft
  | typeof WizIDrafts
  | typeof WizIEditNote
  | typeof WizIEmergencyHome
  | typeof WizIExpandLess
  | typeof WizIExpandMoreBold
  | typeof WizIExpandMore
  | typeof WizIEye
  | typeof WizIFamilyHome
  | typeof WizIFeedback
  | typeof WizIForwardToInbox
  | typeof WizIGroups
  | typeof WizIHelp
  | typeof WizIHistory
  | typeof WizIHome
  | typeof WizIHourglassTop
  | typeof WizIInboxCustomize
  | typeof WizIInfoBold
  | typeof WizIInfoFilled
  | typeof WizIInfo
  | typeof WizILocationCity
  | typeof WizILocationOn
  | typeof WizILogin
  | typeof WizIMail
  | typeof WizIManageAccounts
  | typeof WizIMenuOpen
  | typeof WizIMenu
  | typeof WizIMonitoring
  | typeof WizIMoreVert
  | typeof WizINoteAdd
  | typeof WizINotification
  | typeof WizIOpenInNew
  | typeof WizIPersonFilled
  | typeof WizIPieChart
  | typeof WizIPinDrop
  | typeof WizIPublic
  | typeof WizIRemoveBold
  | typeof WizIRemove
  | typeof WizIReviews
  | typeof WizISchedule
  | typeof WizISearch
  | typeof WizISend
  | typeof WizISettings
  | typeof WizIShoppingmode
  | typeof WizISmartphone
  | typeof WizIStarFilled
  | typeof WizIStars
  | typeof WizIStoreFront
  | typeof WizITab
  | typeof WizITask
  | typeof WizITimerFilled
  | typeof WizIUpload
  | typeof WizIWarning;

export {
  WizIAddCircle,
  WizIAdd,
  WizIAdjust,
  WizIApprovalFilled,
  WizIArrowDownward,
  WizIArrowDropDown,
  WizIArrowDropUp,
  WizIArrowRight,
  WizIArrowUpward,
  WizIAssignmentAdd,
  WizIAssignment,
  WizIAttachFile,
  WizIAutoRenew,
  WizIBarChart4Bars,
  WizIBook,
  WizIBrightFilled,
  WizIBusinessCenter,
  WizICalendar,
  WizICamera,
  WizICancel,
  WizIChangeHistory,
  WizIChatBubbleFilled,
  WizIChat,
  WizICheckBold,
  WizICheckCircleFilled,
  WizICheck,
  WizIChevronLeftBold,
  WizIChevronLeft,
  WizIChevronRightBold,
  WizIChevronRight,
  WizICircleCheck,
  WizICircle,
  WizICloseBold,
  WizIClose,
  WizIContactPageFilled,
  WizIContentCopy,
  WizIContract,
  WizIDashboard,
  WizIDelete,
  WizIDemography,
  WizIDescription,
  WizIDomain,
  WizIDownload,
  WizIDraft,
  WizIDrafts,
  WizIEditNote,
  WizIEmergencyHome,
  WizIExpandLess,
  WizIExpandMoreBold,
  WizIExpandMore,
  WizIEye,
  WizIFamilyHome,
  WizIFeedback,
  WizIForwardToInbox,
  WizIGroups,
  WizIHelp,
  WizIHistory,
  WizIHome,
  WizIHourglassTop,
  WizIInboxCustomize,
  WizIInfoBold,
  WizIInfoFilled,
  WizIInfo,
  WizILocationCity,
  WizILocationOn,
  WizILogin,
  WizIMail,
  WizIManageAccounts,
  WizIMenuOpen,
  WizIMenu,
  WizIMonitoring,
  WizIMoreVert,
  WizINoteAdd,
  WizINotification,
  WizIOpenInNew,
  WizIPersonFilled,
  WizIPieChart,
  WizIPinDrop,
  WizIPublic,
  WizIRemoveBold,
  WizIRemove,
  WizIReviews,
  WizISchedule,
  WizISearch,
  WizISend,
  WizISettings,
  WizIShoppingmode,
  WizISmartphone,
  WizIStarFilled,
  WizIStars,
  WizIStoreFront,
  WizITab,
  WizITask,
  WizITimerFilled,
  WizIUpload,
  WizIWarning,
};
