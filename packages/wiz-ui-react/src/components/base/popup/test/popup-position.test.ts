import { describe, expect, it } from "vitest";

import { Popup, Rect } from "../utils";

class TestablePopup extends Popup {
  test = {
    getPopupDirection: (...params: Parameters<typeof this.getPopupDirection>) =>
      this.getPopupDirection(...params),
  };
}

describe("popup-position", () => {
  describe("Popup", () => {
    describe("getPopupDirection", () => {
      it("ポップアップが画面内に収まっているとき、そのままの方向を返すこと", () => {
        const popup = new TestablePopup({
          anchorRect: new Rect(500, 500, 10, 10),
          popupSize: {
            width: 100,
            height: 100,
          },
          gap: 0,
          screenSize: {
            width: 1000,
            height: 1000,
          },
          scroll: {
            x: 0,
            y: 0,
          },
        });
        expect(
          popup.test.getPopupDirection({
            primary: "left",
            secondary: "bottom",
          })
        ).toEqual({
          primary: "left",
          secondary: "bottom",
        });
      });

      it("ポップアップが画面上方向にはみ出しているとき、下方向に回り込むこと", () => {
        const popup = new TestablePopup({
          anchorRect: new Rect(500, 0, 10, 10),
          popupSize: {
            width: 100,
            height: 100,
          },
          gap: 0,
          screenSize: {
            width: 1000,
            height: 1000,
          },
          scroll: {
            x: 0,
            y: 0,
          },
        });
        expect(
          popup.test.getPopupDirection({
            primary: "top",
            secondary: "left",
          })
        ).toEqual({
          primary: "bottom",
          secondary: "left",
        });
        expect(
          popup.test.getPopupDirection({
            primary: "right",
            secondary: "bottom",
          })
        ).toEqual({
          primary: "right",
          secondary: "top",
        });
      });

      it("ポップアップが画面下方向にはみ出しているとき、上方向に回り込むこと", () => {
        const popup = new TestablePopup({
          anchorRect: new Rect(500, 950, 10, 10),
          popupSize: {
            width: 100,
            height: 100,
          },
          gap: 0,
          screenSize: {
            width: 1000,
            height: 1000,
          },
          scroll: {
            x: 0,
            y: 0,
          },
        });
        expect(
          popup.test.getPopupDirection({
            primary: "bottom",
            secondary: "right",
          })
        ).toEqual({
          primary: "top",
          secondary: "right",
        });
        expect(
          popup.test.getPopupDirection({
            primary: "left",
            secondary: "top",
          })
        ).toEqual({
          primary: "left",
          secondary: "bottom",
        });
      });

      it("ポップアップが画面左方向にはみ出しているとき、右方向に回り込むこと", () => {
        const popup = new TestablePopup({
          anchorRect: new Rect(0, 500, 10, 10),
          popupSize: {
            width: 100,
            height: 100,
          },
          gap: 0,
          screenSize: {
            width: 1000,
            height: 1000,
          },
          scroll: {
            x: 0,
            y: 0,
          },
        });
        expect(
          popup.test.getPopupDirection({
            primary: "left",
            secondary: "center",
          })
        ).toEqual({
          primary: "right",
          secondary: "center",
        });
        expect(
          popup.test.getPopupDirection({
            primary: "top",
            secondary: "right",
          })
        ).toEqual({
          primary: "top",
          secondary: "left",
        });
      });

      it("ポップアップが画面右方向にはみ出しているとき、左方向に回り込むこと", () => {
        const popup = new TestablePopup({
          anchorRect: new Rect(950, 500, 10, 10),
          popupSize: {
            width: 100,
            height: 100,
          },
          gap: 0,
          screenSize: {
            width: 1000,
            height: 1000,
          },
          scroll: {
            x: 0,
            y: 0,
          },
        });
        expect(
          popup.test.getPopupDirection({
            primary: "right",
            secondary: "bottom",
          })
        ).toEqual({
          primary: "left",
          secondary: "bottom",
        });
        expect(
          popup.test.getPopupDirection({
            primary: "bottom",
            secondary: "left",
          })
        ).toEqual({
          primary: "bottom",
          secondary: "right",
        });
      });

      it("ポップアップが画面左上方向にはみ出しているとき、右下方向に回り込むこと", () => {
        const popup = new TestablePopup({
          anchorRect: new Rect(0, 0, 10, 10),
          popupSize: {
            width: 100,
            height: 100,
          },
          gap: 0,
          screenSize: {
            width: 1000,
            height: 1000,
          },
          scroll: {
            x: 0,
            y: 0,
          },
        });
        expect(
          popup.test.getPopupDirection({
            primary: "left",
            secondary: "bottom",
          })
        ).toEqual({
          primary: "right",
          secondary: "top",
        });
      });

      it("gap が考慮されること", () => {
        const baseParams = {
          anchorRect: new Rect(110, 0, 100, 100),
          popupSize: {
            width: 100,
            height: 100,
          },
          screenSize: {
            width: 1000,
            height: 1000,
          },
          scroll: {
            x: 0,
            y: 0,
          },
        };
        expect(
          new TestablePopup({
            ...baseParams,
            gap: 0,
          }).test.getPopupDirection({
            primary: "left",
            secondary: "top",
          })
        ).toEqual({
          primary: "left",
          secondary: "top",
        });

        expect(
          new TestablePopup({
            ...baseParams,
            gap: 20,
          }).test.getPopupDirection({
            primary: "left",
            secondary: "top",
          })
        ).toEqual({
          primary: "right",
          secondary: "top",
        });
      });
    });
  });
});
