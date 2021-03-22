import { Routes, Router, ActivatedRoute } from "@angular/router";
import { Component, AfterViewInit } from "@angular/core";
import * as L from "leaflet";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements AfterViewInit {
	private map;
	constructor() {}

	ngAfterViewInit(): void {
		this.initMap();
	}

	private initMap(): void {
		this.map = L.map("map").setView([27.88, 78.08], 16);
		const tiles = L.tileLayer(
			"https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
			{
				maxZoom: 20,
				minZoom:10,
				id:'mapbox.outdoors',
			}
		);
		tiles.addTo(this.map);
		L.marker([27.88, 78.08])
			.addTo(this.map)
			.bindPopup("Aligarh")
			.openPopup();
	}
}
