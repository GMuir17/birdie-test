"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsController = void 0;
const express = require("express");
const db_1 = require("../libs/db");
exports.eventsController = express.Router();
exports.eventsController.get("/events", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = req.query.startDate || "2019-04-23T00:00:0.000Z";
    const endDate = req.query.endDate || "2019-04-24T00:00:00.000Z";
    const connection = yield (0, db_1.default)();
    const [rows] = yield connection.execute(`  select 
        events.*, 
        tcr.name care_recipient_name,
        tcg.first_name caregiver_first_name,
        tcg.last_name caregiver_last_name
      from events 
      inner join test_care_recipients tcr on events.care_recipient_id = tcr.id
      inner join test_caregivers tcg on events.caregiver_id = tcg.id
      where care_recipient_id = ?
      and events.timestamp between ? and ?
      order by timestamp asc;`, ["df50cac5-293c-490d-a06c-ee26796f850d", startDate, endDate]);
    yield connection.end();
    return res.status(200).send({ events: rows });
})));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBbUM7QUFHbkMsbUNBQXVDO0FBRTFCLFFBQUEsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWpELHdCQUFnQixDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNsRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSx5QkFBeUIsQ0FBQztJQUNuRSxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSwwQkFBMEIsQ0FBQztJQUVoRSxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUEsWUFBYSxHQUFFLENBQUM7SUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FDckM7Ozs7Ozs7Ozs7OEJBVTBCLEVBQzFCLENBQUMsc0NBQXNDLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUM3RCxDQUFDO0lBRUYsTUFBTSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQSxDQUFtQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJleHByZXNzXCI7XG5cbmltcG9ydCBnZXRDb25uZWN0aW9uIGZyb20gXCIuLi9saWJzL2RiXCI7XG5cbmV4cG9ydCBjb25zdCBldmVudHNDb250cm9sbGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuZXZlbnRzQ29udHJvbGxlci5nZXQoXCIvZXZlbnRzXCIsIChhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3Qgc3RhcnREYXRlID0gcmVxLnF1ZXJ5LnN0YXJ0RGF0ZSB8fCBcIjIwMTktMDQtMjNUMDA6MDA6MC4wMDBaXCI7XG4gIGNvbnN0IGVuZERhdGUgPSByZXEucXVlcnkuZW5kRGF0ZSB8fCBcIjIwMTktMDQtMjRUMDA6MDA6MDAuMDAwWlwiO1xuXG4gIGNvbnN0IGNvbm5lY3Rpb24gPSBhd2FpdCBnZXRDb25uZWN0aW9uKCk7XG4gIGNvbnN0IFtyb3dzXSA9IGF3YWl0IGNvbm5lY3Rpb24uZXhlY3V0ZShcbiAgICBgICBzZWxlY3QgXG4gICAgICAgIGV2ZW50cy4qLCBcbiAgICAgICAgdGNyLm5hbWUgY2FyZV9yZWNpcGllbnRfbmFtZSxcbiAgICAgICAgdGNnLmZpcnN0X25hbWUgY2FyZWdpdmVyX2ZpcnN0X25hbWUsXG4gICAgICAgIHRjZy5sYXN0X25hbWUgY2FyZWdpdmVyX2xhc3RfbmFtZVxuICAgICAgZnJvbSBldmVudHMgXG4gICAgICBpbm5lciBqb2luIHRlc3RfY2FyZV9yZWNpcGllbnRzIHRjciBvbiBldmVudHMuY2FyZV9yZWNpcGllbnRfaWQgPSB0Y3IuaWRcbiAgICAgIGlubmVyIGpvaW4gdGVzdF9jYXJlZ2l2ZXJzIHRjZyBvbiBldmVudHMuY2FyZWdpdmVyX2lkID0gdGNnLmlkXG4gICAgICB3aGVyZSBjYXJlX3JlY2lwaWVudF9pZCA9ID9cbiAgICAgIGFuZCBldmVudHMudGltZXN0YW1wIGJldHdlZW4gPyBhbmQgP1xuICAgICAgb3JkZXIgYnkgdGltZXN0YW1wIGFzYztgLFxuICAgIFtcImRmNTBjYWM1LTI5M2MtNDkwZC1hMDZjLWVlMjY3OTZmODUwZFwiLCBzdGFydERhdGUsIGVuZERhdGVdXG4gICk7XG5cbiAgYXdhaXQgY29ubmVjdGlvbi5lbmQoKTtcbiAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgZXZlbnRzOiByb3dzIH0pO1xufSkgYXMgUmVxdWVzdEhhbmRsZXIpO1xuLy8gIF5eIHJlcXVlc3QgaGFuZGxlciBhYm92ZSByZW1vdmVzIGEgbGludGluZyBlcnJvclxuIl19