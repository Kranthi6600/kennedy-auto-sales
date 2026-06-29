"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Dropdown from '../../components/Dropdown';
import { useCompare, type Vehicle } from '../../lib/useCompare';
import { fetchInventory } from '../../lib/api';
import Pagination from '../../components/Pagination';

const ITEMS_PER_PAGE = 9;

const sortOptions = [
  { value: 'created_at:desc', label: 'Newest First' },
  { value: 'created_at:asc', label: 'Oldest First' },
  { value: 'price:asc', label: 'Price: Low to High' },
  { value: 'price:desc', label: 'Price: High to Low' },
  { value: 'title:asc', label: 'Title: A to Z' },
  { value: 'title:desc', label: 'Title: Z to A' },
];

type FilterState = {
  search: string;
  category: string[];
  bodyType: string[];
  brand: string[];
  transmission: string[];
  drivetrain: string[];
  colors: string[];
  fuel: string[];
  doors: string[];
  seats: string[];
  condition: string[];
  featured: boolean;
};

const defaultFilters: FilterState = {
  search: '',
  category: [],
  bodyType: [],
  brand: [],
  transmission: [],
  drivetrain: [],
  colors: [],
  fuel: [],
  doors: [],
  seats: [],
  condition: [],
  featured: false,
};

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="filter-section">
      <button className="filter-section-header" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={`filter-chevron ${open ? 'open' : ''}`}>▾</span>
      </button>
      {open && <div className="filter-section-body">{children}</div>}
    </div>
  );
}

function CheckboxFilter({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="filter-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

export default function InventoryPage() {
  const { compareList, addToCompare, removeFromCompare, isInCompare, maxReached, mounted } = useCompare();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState('created_at:desc');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchInventory({ type: 'vehicle', limit: 100, sortBy: 'created_at', sortOrder: 'desc' })
      .then((res) => {
        if (!cancelled) {
          setAllVehicles(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load inventory');
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const uniqueValues = useMemo(() => {
    const getAttr = (key: string) =>
      [...new Set(allVehicles.map((v) => v.attributes?.[key]).filter(Boolean) as string[])].sort();
    const getCats = () =>
      [...new Set(allVehicles.map((v) => v.category?.name).filter(Boolean) as string[])].sort();
    return {
      categories: getCats(),
      bodyTypes: getAttr('body_type'),
      brands: getAttr('make'),
      transmissions: getAttr('transmission'),
      drivetrains: getAttr('drivetrain'),
      colors: getAttr('exterior_color'),
      fuels: getAttr('fuel_type'),
      doors: getAttr('doors'),
      seats: getAttr('seats'),
      conditions: getAttr('condition'),
    };
  }, [allVehicles]);

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const filtered = useMemo(() => {
    let result = allVehicles.filter((v) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const haystack = `${v.title} ${v.attributes?.make || ''} ${v.attributes?.model || ''} ${v.attributes?.body_type || ''} ${v.attributes?.fuel_type || ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.category.length && !filters.category.includes(v.category?.name || '')) return false;
      if (filters.bodyType.length && !filters.bodyType.includes(v.attributes?.body_type || '')) return false;
      if (filters.brand.length && !filters.brand.includes(v.attributes?.make || '')) return false;
      if (filters.transmission.length && !filters.transmission.includes(v.attributes?.transmission || '')) return false;
      if (filters.drivetrain.length && !filters.drivetrain.includes(v.attributes?.drivetrain || '')) return false;
      if (filters.colors.length && !filters.colors.includes(v.attributes?.exterior_color || '')) return false;
      if (filters.fuel.length && !filters.fuel.includes(v.attributes?.fuel_type || '')) return false;
      if (filters.doors.length && !filters.doors.includes(v.attributes?.doors || '')) return false;
      if (filters.seats.length && !filters.seats.includes(v.attributes?.seats || '')) return false;
      if (filters.condition.length && !filters.condition.includes(v.attributes?.condition || '')) return false;
      if (filters.featured && !v.featured) return false;
      return true;
    });

    const [sortField, sortDir] = sortBy.split(':');
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'price') {
        cmp = (a.price ?? 0) - (b.price ?? 0);
      } else if (sortField === 'title') {
        cmp = a.title.localeCompare(b.title);
      } else if (sortField === 'created_at') {
        cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [allVehicles, filters, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    count += filters.category.length + filters.bodyType.length + filters.brand.length +
      filters.transmission.length + filters.drivetrain.length + filters.colors.length +
      filters.fuel.length + filters.doors.length + filters.seats.length + filters.condition.length;
    if (filters.featured) count++;
    return count;
  }, [filters]);

  const clearAllFilters = () => {
    setFilters(defaultFilters);
    setSearchInput('');
    setCurrentPage(1);
  };

  const handleCompare = (v: Vehicle) => {
    if (isInCompare(v.id)) {
      removeFromCompare(v.id);
    } else {
      addToCompare(v);
    }
  };

  const formatPrice = (v: Vehicle) => {
    if (!v.price_visible) return 'Contact for pricing';
    if (v.price_label) return v.price_label;
    if (v.price === null) return 'Contact for pricing';
    if (v.price === 0) return 'Free';
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: v.currency || 'CAD', maximumFractionDigits: 0 }).format(v.price);
  };

  const formatMileage = (v: Vehicle) => {
    const m = v.attributes?.mileage;
    if (!m) return 'N/A';
    const num = parseInt(m, 10);
    if (isNaN(num)) return m;
    return `${num.toLocaleString()} KM`;
  };

  const sidebar = (
    <aside className="inv-sidebar">
      <div className="inv-sidebar-header">
        <h3>Filters</h3>
        {activeFilterCount > 0 && (
          <button className="inv-sidebar-clear" onClick={clearAllFilters}>
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      <div className="inv-sidebar-search">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <FilterSection title="Category">
        {uniqueValues.categories.map((c) => (
          <CheckboxFilter
            key={c}
            label={c}
            checked={filters.category.includes(c)}
            onChange={() => toggleArrayFilter('category', c)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Body Type">
        {uniqueValues.bodyTypes.map((b) => (
          <CheckboxFilter
            key={b}
            label={b}
            checked={filters.bodyType.includes(b)}
            onChange={() => toggleArrayFilter('bodyType', b)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Brand">
        {uniqueValues.brands.map((b) => (
          <CheckboxFilter
            key={b}
            label={b}
            checked={filters.brand.includes(b)}
            onChange={() => toggleArrayFilter('brand', b)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Transmission">
        {uniqueValues.transmissions.map((t) => (
          <CheckboxFilter
            key={t}
            label={t}
            checked={filters.transmission.includes(t)}
            onChange={() => toggleArrayFilter('transmission', t)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Drivetrain">
        {uniqueValues.drivetrains.map((p) => (
          <CheckboxFilter
            key={p}
            label={p}
            checked={filters.drivetrain.includes(p)}
            onChange={() => toggleArrayFilter('drivetrain', p)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Ext. Colors">
        {uniqueValues.colors.map((c) => (
          <CheckboxFilter
            key={c}
            label={c}
            checked={filters.colors.includes(c)}
            onChange={() => toggleArrayFilter('colors', c)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Fuel">
        {uniqueValues.fuels.map((f) => (
          <CheckboxFilter
            key={f}
            label={f}
            checked={filters.fuel.includes(f)}
            onChange={() => toggleArrayFilter('fuel', f)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Doors">
        {uniqueValues.doors.map((d) => (
          <CheckboxFilter
            key={d}
            label={`${d} Doors`}
            checked={filters.doors.includes(d)}
            onChange={() => toggleArrayFilter('doors', d)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Seats">
        {uniqueValues.seats.map((s) => (
          <CheckboxFilter
            key={s}
            label={`${s} Seats`}
            checked={filters.seats.includes(s)}
            onChange={() => toggleArrayFilter('seats', s)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Condition">
        {uniqueValues.conditions.map((c) => (
          <CheckboxFilter
            key={c}
            label={c}
            checked={filters.condition.includes(c)}
            onChange={() => toggleArrayFilter('condition', c)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Options">
        <CheckboxFilter
          label="Featured Only"
          checked={filters.featured}
          onChange={() => setFilters({ ...filters, featured: !filters.featured })}
        />
      </FilterSection>
    </aside>
  );

  return (
    <>
      <Navbar />

      <section className="subpage-section inv-page-section">
        <div className="subpage-header">
          <span className="section-eyebrow">BROWSE VEHICLES</span>
          <h1 className="subpage-title">Our Inventory</h1>
          <p className="subpage-subtitle">{loading ? 'Loading vehicles…' : `${allVehicles.length} vehicles available. Find your perfect match.`}</p>
        </div>

        {error && (
          <div className="inv-error-state">
            <p>Failed to load inventory: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {!error && (
          <div className="inv-layout">
            {sidebar}

            <div className="inv-main">
              <div className="inventory-toolbar">
                <div className="inventory-count">
                  {loading ? 'Loading…' : `${filtered.length} Vehicles`}
                  {activeFilterCount > 0 && <span className="inv-filter-count"> · {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>}
                </div>
                <div className="inventory-sort">
                  <span className="sort-label">Sort by:</span>
                  <Dropdown
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    className="sort-dropdown"
                    ariaLabel="Sort vehicles"
                  />
                </div>
                <button
                  className="inv-mobile-filter-toggle"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  Filters ({activeFilterCount})
                </button>
              </div>

              {mobileFiltersOpen && (
                <div className="inv-mobile-filters">
                  {sidebar}
                </div>
              )}

              {loading ? (
                <div className="inv-loading-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="inv-card-skeleton">
                      <div className="skeleton-img" />
                      <div className="skeleton-body">
                        <div className="skeleton-line w-60" />
                        <div className="skeleton-line w-40" />
                        <div className="skeleton-line w-80" />
                        <div className="skeleton-line w-50" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="inv-no-results">
                  <p>No vehicles match your filters.</p>
                  <button onClick={clearAllFilters}>Clear All Filters</button>
                </div>
              ) : (
                <div className="inventory-grid">
                  {paginated.map((v) => {
                    const selected = mounted && isInCompare(v.id);
                    const disabled = !selected && maxReached;
                    return (
                      <div key={v.id} className="inv-card glass-card">
                        <div className="inv-card-img">
                          <img src={v.thumbnail || v.images?.[0]?.url || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'} alt={v.thumbnail_alt || v.title} loading="lazy" decoding="async" />
                          <span className="inv-tag">{v.attributes?.body_type || 'Vehicle'}</span>
                          {v.featured && <span className="inv-new-badge">Featured</span>}
                          {selected && <span className="inv-selected-badge">✓ Selected</span>}
                        </div>
                        <div className="inv-card-body">
                          <div className="inv-price-area">
                            <div className="inv-price-tag">{formatPrice(v)}</div>
                            <div className="inv-price-note">{v.price_visible && v.price ? '+ tax & licensing' : '\u00A0'}</div>
                          </div>
                          <h3 className="inv-name">{v.title}</h3>
                          <p className="inv-trim">{v.attributes?.condition || ''}{v.attributes?.condition && v.attributes?.engine_size ? ' · ' : ''}{v.attributes?.engine_size ? `${v.attributes.engine_size}L` : ''}</p>
                          <div className="inv-specs-grid">
                            <div className="inv-spec-item"><span className="inv-spec-label">Mileage</span><span className="inv-spec-val">{formatMileage(v)}</span></div>
                            <div className="inv-spec-item"><span className="inv-spec-label">Engine</span><span className="inv-spec-val">{v.attributes?.engine_size ? `${v.attributes.engine_size}L` : 'N/A'}</span></div>
                            <div className="inv-spec-item"><span className="inv-spec-label">Drivetrain</span><span className="inv-spec-val">{v.attributes?.drivetrain || 'N/A'}</span></div>
                            <div className="inv-spec-item"><span className="inv-spec-label">Fuel Type</span><span className="inv-spec-val">{v.attributes?.fuel_type || 'N/A'}</span></div>
                            <div className="inv-spec-item"><span className="inv-spec-label">Transmission</span><span className="inv-spec-val">{v.attributes?.transmission || 'N/A'}</span></div>
                            <div className="inv-spec-item"><span className="inv-spec-label">Body Style</span><span className="inv-spec-val">{v.attributes?.body_type || 'N/A'}</span></div>
                          </div>
                          <div className="inv-btn-row">
                            <button
                              className={`inv-btn-secondary ${selected ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                              onClick={() => handleCompare(v)}
                              disabled={disabled}
                            >
                              {selected ? '✓ Comparing' : disabled ? 'Max 4' : 'Compare'}
                            </button>
                            <Link href={`/inventory/${v.slug}`} className="inv-cta">View Details →</Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {!loading && filtered.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        )}
      </section>

      {mounted && compareList.length > 0 && (
        <div className="compare-bar">
          <div className="compare-bar-info">
            <span className="compare-bar-count">{compareList.length}</span>
            <span className="compare-bar-label">vehicle{compareList.length > 1 ? 's' : ''} selected</span>
          </div>
          <div className="compare-bar-thumbs">
            {compareList.map((v) => (
              <div key={v.id} className="compare-bar-thumb" title={v.title}>
                <img src={v.thumbnail || v.images?.[0]?.url || ''} alt={v.title} loading="lazy" decoding="async" />
                <button className="compare-bar-remove" onClick={() => removeFromCompare(v.id)}>×</button>
              </div>
            ))}
          </div>
          <div className="compare-bar-actions">
            <button className="compare-bar-clear" onClick={() => compareList.forEach((v) => removeFromCompare(v.id))}>Clear</button>
            <Link href="/compare" className="compare-bar-go">Compare →</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
