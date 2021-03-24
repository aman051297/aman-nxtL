import { Routes, Router, ActivatedRoute } from "@angular/router";
import { Component, AfterViewInit } from "@angular/core";
import * as L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements AfterViewInit {
	locations: any;
	private map;
	constructor(private auth: AuthService) {}

	ngAfterViewInit(): void {
		this.location();
		this.initMap();
	}

	private initMap(): void {
		this.map = L.map("map").setView([27.88, 78.08], 12);
		doubleClickZoom: false;

		// preferCanvas:true;
		// const tiles = L.tileLayer(
		// 	"https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
		// 	{
		// 		maxZoom: 20,
		// 		minZoom:10,
		// 		id:'mapbox.outdoors',
		// 	}
		// );
		const tiles = L.tileLayer(
			`https://api.mapbox.com/styles/v1/aman051297/ckmlvg5w47fkt18nppzbcaiwk/tiles/256/{z}/{x}/{y}?access_token=${environment.MAPBOX_TOKEN}`,
			{
				maxZoom: 20,
				minZoom: 10,
				id: "mapbox/streets-v11",
				accessToken: environment.MAPBOX_TOKEN,
			}
		);
		var datacentre = L.icon({
			iconUrl: "assets/images/datacentre.svg",
			iconSize: [38, 95], // size of the icon
			iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62], // the same for the shadow
			popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
		});
		var Junction = L.icon({
			iconUrl: "assets/images/junction.svg",

			iconSize: [38, 95], // size of the icon
			iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62], // the same for the shadow
			popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
		});

		var Highway = L.icon({
			iconUrl: "assets/images/highway.svg",

			iconSize: [38, 95], // size of the icon
			iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62], // the same for the shadow
			popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
		});

		var Control_room = L.icon({
			iconUrl: "assets/images/control_room.svg",

			iconSize: [38, 95], // size of the icon
			iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62], // the same for the shadow
			popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
		});

		tiles.addTo(this.map);
		L.marker([27.844444, 78.154167], { icon: Junction })
			.addTo(this.map)
			.bindPopup("KSM")
			.openPopup();

		L.marker([27.858889, 78.145278], { icon: Highway })
			.addTo(this.map)
			.bindPopup("KSM-Highway1")
			.openPopup();

		L.marker([27.851944, 78.170556], { icon: datacentre })
			.addTo(this.map)
			.bindPopup("KSM-DataCentre")
			.openPopup();

		L.marker([27.838611, 78.200556], { icon: Control_room })
			.addTo(this.map)
			.bindPopup("KSM-ControlRoom")
			.openPopup();

		L.marker([27.845556, 78.119444], { icon: Junction })
			.addTo(this.map)
			.bindPopup("Test_Junction")
			.openPopup();

		L.marker([27.845, 78.146667], { icon: Junction })
			.addTo(this.map)
			.bindPopup("Uppal")
			.openPopup();
	}

	location() {
		this.auth.locations().subscribe(
			(res: any) => {
				this.locations = res;
				console.log(this.locations);
			},
			(err: any) => {}
		);
	}
}
