import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { City } from 'src/app/models/City';
import Offer from 'src/app/models/offer';
import { Ticket } from 'src/app/models/ticket';
import { CityService } from 'src/app/services/cities.service';
import { OfferService } from 'src/app/services/offer.service';
import { CreateOfferComponent } from './create-offer/create-offer.component';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
  offers = new BehaviorSubject<Offer[]>([]);
  cities: City[] = [];
  displayedColumns = [
    'OfferId',
    'OfferName',
    'City',
    'OfferDescription',
    'Price',
    // 'Image',
    'edit',
    'delete',
  ];
  options = [
    'OfferId',
    'OfferName',
    'City',
    'OfferDescription',
    'Price',
  ];

  countNumber = 0;
  columnData: string = '';
  allOfferVlues: Offer[] = [];
  searchText: string = '';

  constructor(
    private matDialog: MatDialog,
    private cityService: CityService,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.offerService.getOffers().subscribe((res) => {
      this.offers.next(res);
      this.allOfferVlues = res;
    });
    this.cityService.getCities().subscribe((res) => {
      this.cities = res;
    });
  }

  AddTicket() {
    const dialog = this.matDialog.open(CreateOfferComponent, {
      width: `90%`,
      data: { cities: this.cities },
    });
    dialog.afterClosed().subscribe((res: any) => {
      this.offerService.createOffer(res).subscribe((res) => {
        this.offers.value.push(res);
        this.offers.next(this.offers.value);
      });
    });
  }
  deleteTicket(id: string) {
    this.offerService.deleteOffer(id).subscribe(() => {
      const index = this.offers.value.findIndex(
        (user) => user.OfferId.toString() === id.toString()
      );
      if (index !== -1) {
        this.offers.value.splice(index, 1);
        this.offers.next(this.offers.value);
      }
    });
  }
  editTicket(offer: Offer) {
    const dialog = this.matDialog.open(CreateOfferComponent, {
      width: `90%`,
      data: {
        offer: offer,
        isEditMode: true,
        cities: this.cities,
      },
    });
    dialog.afterClosed().subscribe((res: any) => {
      this.offerService
        .updateOffer(offer.OfferId.toString(), res)
        .subscribe((res) => {
          const index = this.offers.value.findIndex(
            (user) => user.OfferId === res.OfferId
          );
          if (index !== -1) {
            this.offers.value.splice(index, 1, res);
            this.offers.next(this.offers.value);
          }
        });
    });
  }
  // getStartPoint(id: number | null) {
  //   return id !== null
  //     ? this.startPoints.find(
  //         (item) => item.StartPointId?.toString() === id.toString()
  //       )?.DeparatureCityName
  //     : '';
  // }

  sort(column: any) {
    this.countNumber++;
    if (this.columnData !== column) {
      this.columnData = column;
      this.countNumber = 1;
    }
    if (this.countNumber === 1) {
      this.columnData = column;
      this.offers.value.sort((a: any, b: any) =>
        a[column] < b[column] === true ? -1 : (a[column] === b[column]) === true ? 0 : 1
      );
      this.offers.next(this.offers.value);
    } else if (this.countNumber === 2) {
      this.columnData = column;

      this.offers.value
        .sort((a: any, b: any) =>
          a[column] < b[column] === true
            ? -1
            : (a[column] === b[column]) === true
            ? 0
            : 1
        )
        .reverse();
      this.offers.next(this.offers.value);
    } else {
      this.countNumber = 0;
    }
  }
  filterCities() {
    if (this.filterByColumn) {
      const filteredValues = this.allOfferVlues.filter((ticket) =>
      {const ticketData = this.filterByColumn === 'City' ?
          (ticket[this.filterByColumn as keyof Offer] as City).CityName : ticket[this.filterByColumn as keyof Offer]
        return ticketData?.toString()?.toLowerCase()?.includes(this.searchText.toString().toLowerCase())}
      );
      this.offers.next(filteredValues);
    } else {
      const filteredValues = this.allOfferVlues.filter((ticket) =>
        ticket.OfferId.toString()
          .toLowerCase()
          .includes(this.searchText.toString().toLowerCase())
      );
      this.offers.next(filteredValues);
    }
  }
  filterByColumn: string = '';
  changeValue(option: string) {
    this.filterByColumn = option;
  }
}
