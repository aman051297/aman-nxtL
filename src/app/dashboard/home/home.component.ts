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
		this.map = L.map("map").setView([27.88, 78.08], 13);
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
				// id:'mapbox.outdoors',

				id: "mapbox/streets-v11",
				accessToken: environment.MAPBOX_TOKEN,
			}
		);
		tiles.addTo(this.map);
		L.marker([27.88, 78.08])
			.addTo(this.map)
			.bindPopup("Test Junction")
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
